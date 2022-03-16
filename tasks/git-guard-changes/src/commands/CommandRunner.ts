import * as tl from 'azure-pipelines-task-lib/task';
import { IExecSyncOptions, IExecSyncResult, ToolRunner } from 'azure-pipelines-task-lib/toolrunner';
import { EOL } from 'os';

import { isNullValue } from '../utils/checkUtils';
import { getChangedFilesBetweenCommits, getLatestTagsMatchingPattern } from './GitCommands';

const getTool = (args: string[]): ToolRunner => {
  const toolPath: string = tl.which('git', true);
  const toolRunner: ToolRunner = tl.tool(toolPath).arg(args);
  return toolRunner;
};

const sharedOptions: IExecSyncOptions = {
  silent: true
};

export const resolveCommit = async (
  commitFormat: string,
  sourceDirectory: string
): Promise<string> => {
  const parts = commitFormat.split(':');

  if (parts.length < 2) return commitFormat;
  const latestTag = await getLatestTag(parts[1], sourceDirectory);

  if (isNullValue(latestTag)) {
    throw new Error(`Failed to find any tags matching the pattern ${parts[1]}`);
  }
  return latestTag;
};

export const getLatestTag = async (tagFormat: string, sourceDirectory: string): Promise<string> => {
  tl.cd(sourceDirectory);
  const toolRunner = getTool(getLatestTagsMatchingPattern(tagFormat));
  const result: IExecSyncResult = toolRunner.execSync(sharedOptions);

  if (result && result.code == 0) {
    const tags = getResultAsArray(result.stdout);

    if (tags && tags.length === 1) return tags[0];
    return tags && tags[tags.length - 1];
  } else {
    tl.error(result.stderr);
    throw new Error(`Failed to get tags. See log for details`);
  }
};

export const getChanges = async (
  sourceCommit: string,
  targetCommit: string,
  sourceDirectory: string
): Promise<string[]> => {
  tl.cd(sourceDirectory);
  const toolRunner = getTool(getChangedFilesBetweenCommits(sourceCommit, targetCommit));
  const result: IExecSyncResult = toolRunner.execSync(sharedOptions);

  if (result && result.code == 0) {
    return getResultAsArray(result.stdout);
  } else {
    tl.error(result.stderr);
    throw new Error(`Failed to get changes. See log for details`);
  }
};

export const getResultAsArray = (stdout: string): string[] =>
  stdout?.split(EOL)?.filter(t => !isNullValue(t) && t !== ' ');
