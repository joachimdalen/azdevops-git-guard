import * as tl from 'azure-pipelines-task-lib/task';
import { EOL } from 'os';

import { getChanges, resolveCommit } from '../commands';
import * as Constants from '../Constants';
import { GitGuardOptions } from './GitGuardOptions';

export class GitGuard {
  private _options: GitGuardOptions;
  constructor(options: GitGuardOptions) {
    this._options = options;

    if (!options.errorLogger) this._options.errorLogger = console.error;
    if (!options.infoLogger) this._options.infoLogger = console.log;
  }

  public async checkChange(): Promise<boolean> {
    const {
      sourceCommitHash,
      targetCommitHash,
      sourcesDirectory,
      matchStrategy,
      matchPattern,
      breakOnFailure
    } = this._options;

    const resolvedSource = await resolveCommit(sourceCommitHash, sourcesDirectory);
    const resolvedTarget = await resolveCommit(targetCommitHash, sourcesDirectory);
    const changedFiles = await getChanges(resolvedSource, resolvedTarget, sourcesDirectory);

    const findOptions = <tl.FindOptions>{
      allowBrokenSymbolicLinks: true,
      followSpecifiedSymbolicLink: true,
      followSymbolicLinks: true
    };

    const matchingFiles = tl
      .findMatch(sourcesDirectory, matchPattern, findOptions)
      ?.map(f => f.replace(sourcesDirectory, '').replace(/^[/\\]+/, ''));

    if (matchingFiles?.length === 0) {
      throw new Error(`No files matching the pattern '${matchPattern}' found`);
    }

    let result = false;
    if (matchStrategy === 'all') {
      result = matchingFiles.every(toVerify => changedFiles.indexOf(toVerify) !== -1);
    } else {
      result = matchingFiles.some(toVerify => changedFiles.indexOf(toVerify) !== -1);
    }

    tl.setVariable(Constants.outVariableChangeResultName, result?.toString());
    tl.setVariable(Constants.outVariableChangeCountName, changedFiles?.length?.toString());
    tl.setVariable(Constants.outVariableChangeMatchesName, changedFiles?.join(EOL));

    if (breakOnFailure && result === false) {
      tl.setResult(tl.TaskResult.Failed, 'Failed to find changed files');
    }

    return result;
  }
}
