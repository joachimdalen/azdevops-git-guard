export interface GitGuardOptions {
  sourceCommitHash: string;
  targetCommitHash: string;
  matchPattern: string;
  matchStrategy: 'single' | 'all';
  sourcesDirectory: string;
  breakOnFailure: boolean;

  // /**
  //  * Get variable value
  //  */

  getVariable?: (name: string) => string | undefined;

  /**
   * Alternative logger for errors
   */
  errorLogger?: (message: string) => void;

  /**
   * Alternative logger for informational messages
   */
  infoLogger?: (message: string) => void;
}
