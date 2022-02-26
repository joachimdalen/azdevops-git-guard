/**
 * Get changed files between two commit hashs
 * @param sourceCommit The source commit to check from. Oldest.
 * @param targetCommit The target commit to check to. Newest.
 * @param defaultTarget Default target commit if target is not head (defaults to HEAD~).
 */
export const getChangedFilesBetweenCommits = (
  sourceCommit: string,
  targetCommit?: string,
  defaultTarget = 'HEAD~'
): string[] => ['diff', sourceCommit, targetCommit || defaultTarget, '--name-only'];

export const getLatestTagsMatchingPattern = (pattern: string): string[] => [
  'tag',
  '--sort=committerdate',
  '-l',
  pattern
];
