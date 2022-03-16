import * as ma from 'azure-pipelines-task-lib/mock-answer';
import * as tmrm from 'azure-pipelines-task-lib/mock-run';
import { EOL } from 'os';
import * as path from 'path';

const taskPath = path.join(__dirname, '../..', 'index.js');
const tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tr.setInput('sourceCommitHash', 'commitA');
tr.setInput('targetCommitHash', 'commitB');
tr.setInput('matchPattern', '**/README.md');
tr.setInput('matchStrategy', 'all');

const a: ma.TaskLibAnswers = <ma.TaskLibAnswers>{
  which: {
    git: '/usr/bin/git'
  },
  checkPath: {
    '/usr/bin/git': true
  },
  exec: {
    [`/usr/bin/git diff commitA commitB --name-only`]: {
      code: 0,
      stdout: ['common/CHANGELOG.md', 'tasks/CHANGELOG.md'].join(EOL)
    }
  },
  findMatch: {
    '**/README.md': ['common/README.md', 'tasks/README.md', 'package/README.md']
  }
};

tr.setAnswers(a);
tr.run();
