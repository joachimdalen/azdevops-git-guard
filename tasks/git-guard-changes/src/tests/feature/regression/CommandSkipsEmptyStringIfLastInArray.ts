import * as ma from 'azure-pipelines-task-lib/mock-answer';
import * as tmrm from 'azure-pipelines-task-lib/mock-run';
import { EOL } from 'os';
import * as path from 'path';

const taskPath = path.join(__dirname, '../../..', 'index.js');
const tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tr.setInput('sourceCommitHash', 'tag:v*-dev');
tr.setInput('targetCommitHash', 'commitB');
tr.setInput('matchPattern', '**/README.md');
tr.setInput('matchStrategy', 'single');
tr.setInput('changed', 'true');

const a: ma.TaskLibAnswers = <ma.TaskLibAnswers>{
  which: {
    git: '/usr/bin/git'
  },
  checkPath: {
    '/usr/bin/git': true
  },
  exec: {
    [`/usr/bin/git diff v1.0.2-dev commitB --name-only`]: {
      code: 0,
      stdout: ['common/README.md', 'tasks/README.md'].join(EOL)
    },
    [`/usr/bin/git tag --sort=committerdate -l v*-dev`]: {
      code: 0,
      stdout: ['v1.0.1-dev', 'v1.0.2-dev', ' ', ''].join(EOL)
    }
  },
  findMatch: {
    '**/README.md': ['common/README.md', 'tasks/README.md', 'packages/README.md']
  }
};
tr.setAnswers(a);
tr.run();
