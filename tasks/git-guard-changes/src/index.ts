import tl = require('azure-pipelines-task-lib/task');

import { GitGuard } from './operations/GitGuard';
import { GitGuardOptions } from './operations/GitGuardOptions';

async function run(): Promise<void> {
  try {
    const options: GitGuardOptions = {
      errorLogger: tl.error,
      infoLogger: console.log,
      getVariable: tl.getVariable,
      sourceCommitHash: tl.getInput('sourceCommitHash', true),
      targetCommitHash: tl.getInput('targetCommitHash'),
      matchPattern: tl.getInput('matchPattern'),
      matchStrategy: tl.getInput('matchStrategy') as any,
      breakOnFailure: tl.getBoolInput('breakOnFailure'),
      sourcesDirectory: tl.getVariable('System.DefaultWorkingDirectory')
    };

    const guarder = new GitGuard(options);
    await guarder.checkChange();

    tl.setResult(tl.TaskResult.Succeeded, 'Completed');
  } catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();
