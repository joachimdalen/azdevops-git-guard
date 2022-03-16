/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as ttm from 'azure-pipelines-task-lib/mock-test';
import { expect } from 'chai';
import * as path from 'path';

import * as Constants from '../../Constants';

describe('GitGuard > GitGuardChanges Suite', function () {
  describe('> Given source and target commit with matchStrategy=all', function () {
    it('should set true when files are changed', function () {
      const taskPath = path.join(__dirname, 'GivenSourceandTargetWithMatchAllTrue.js');
      const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
      tr.run();

      if (!tr.succeeded) {
        console.log(tr.stdout);
      }

      expect(tr.stderr).to.be.empty;
      expect(tr.succeeded).to.be.true;
      expect(
        tr.stdOutContained(
          `##vso[task.setvariable variable=${Constants.outVariableChangeResultName};isOutput=false;issecret=false;]true`
        )
      ).to.be.true;
    });
    it('should set false when files are not changed', function () {
      const taskPath = path.join(__dirname, 'GivenSourceandTargetWithMatchAllFalse.js');
      const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
      tr.run();

      if (!tr.succeeded) {
        console.log(tr.stdout);
      }
      expect(
        tr.stdOutContained(
          `##vso[task.setvariable variable=${Constants.outVariableChangeResultName};isOutput=false;issecret=false;]false`
        )
      ).to.be.true;
      expect(tr.stderr).to.be.empty;
      expect(tr.succeeded).to.be.true;
    });
    it('should break build on failure when set', function () {
      const taskPath = path.join(__dirname, 'GivenSourceandTargetWithMatchAllFalseBreaking.js');
      const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
      tr.run();

      if (tr.succeeded) {
        console.log(tr.stdout);
      }
      expect(
        tr.stdOutContained(
          `##vso[task.setvariable variable=${Constants.outVariableChangeResultName};isOutput=false;issecret=false;]false`
        )
      ).to.be.true;
      expect(tr.stderr).to.be.empty;
      expect(tr.succeeded).to.be.false;
    });
    it('should not break build on success when set', function () {
      const taskPath = path.join(__dirname, 'GivenSourceandTargetWithMatchAllTrueSuccess.js');
      const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
      tr.run();

      if (!tr.succeeded) {
        console.log(tr.stdout);
      }
      expect(
        tr.stdOutContained(
          `##vso[task.setvariable variable=${Constants.outVariableChangeResultName};isOutput=false;issecret=false;]true`
        )
      ).to.be.true;
      expect(tr.stderr).to.be.empty;
      expect(tr.succeeded).to.be.true;
    });
  });
  describe('> Given source and target commit with matchStrategy=singe', function () {
    it('should set true when one file is changed', function () {
      const taskPath = path.join(__dirname, 'GivenSourceandTargetWithMatchSingleTrue.js');
      const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
      tr.run();

      if (!tr.succeeded) {
        console.log(tr.stdout);
      }

      expect(tr.stderr).to.be.empty;
      expect(tr.succeeded).to.be.true;
      expect(
        tr.stdOutContained(
          `##vso[task.setvariable variable=${Constants.outVariableChangeResultName};isOutput=false;issecret=false;]true`
        )
      ).to.be.true;
    });
    it('should match tag query to latest tag', function () {
      const taskPath = path.join(__dirname, 'TagQueryShouldMatchWhenValid.js');
      const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
      tr.run();

      if (!tr.succeeded) {
        console.log(tr.stdout);
        console.log(tr.stderr);
      }

      expect(
        tr.stdOutContained(
          `##vso[task.setvariable variable=${Constants.outVariableChangeResultName};isOutput=false;issecret=false;]true`
        )
      ).to.be.true;
      expect(tr.stderr).to.be.empty;
      expect(tr.succeeded).to.be.true;
    });
    it('should fail when no matching tags are found', function () {
      const taskPath = path.join(__dirname, 'TagQueryShouldFailOnNoMatchingTags.js');
      const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
      tr.run();

      if (tr.succeeded) {
        console.log(tr.stderr);
      }

      expect(tr.failed).to.be.true;
    });
  });
});

describe('GitGuard > GitGuardChanges Regression Suite', function () {
  it('should not return empty string if last in array', function () {
    const taskPath = path.join(__dirname, 'regression', 'CommandSkipsEmptyStringIfLastInArray.js');
    const tr: ttm.MockTestRunner = new ttm.MockTestRunner(taskPath);
    tr.run();

    if (!tr.succeeded) {
      console.log(tr.stdout);
      console.log(tr.stderr);
    }

    expect(
      tr.stdOutContained(
        `##vso[task.setvariable variable=${Constants.outVariableChangeResultName};isOutput=false;issecret=false;]true`
      )
    ).to.be.true;
    expect(tr.stderr).to.be.empty;
    expect(tr.succeeded).to.be.true;
  });
});

function printLines(content: string): void {
  const lines = content.split('/n');

  for (let i = 0; i < lines.length; i++) {
    console.log(lines[i]);
  }
}
