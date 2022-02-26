# GitGuardChanges@[x]

---

**Allows checking for changes in git files**

---

# ⚙️ Options

- `sourceCommitHash`: Oldest commit hash to check from (Default `HEAD`). Can also be resolved using [this](#commit-query).
- `targetCommitHash`: Newest commit hash to check to. Can also be resolved using [this](#commit-query).
- `matchPattern`: Files to match
- `matchStrategy`: If `single` only a single result from `matchPattern` needs to be matched, else all. Accepts:
  - `single`
  - `all`
- `breakOnFailure`: Break pipeline on failure (Default `false`).

# 🔮 Outputs

- `gitGuardChangesResult`: Match result, `true` or `false`
- `gitGuardChangesCount`: Count of number of matched files that was changed
- `gitGuardChangesMatches`: List of file paths of files that was changed. This are separated with the respective `EOL` character. 

# 📜 Commit Query

"Commit Query" allows you resolve certain git hashes dynamically. It is basically just a selector for what git commands should be run in the background.

- `tag:<matchFormat>`: Fetches the latest tag matching the format

## Example

Assume the repo contains two tags, `v0.0.7-dev`, `v0.0.8-dev`, and `v0.0.9` the following `tag:v*-dev` expression would resolve to the latest tag created. In this case `v0.0.8-dev`. The query `tag:v*[!-dev]` would resolve `v0.0.9`.

# ❓ Pipeline Examples

## Verify a single file has been changed

Assume the latest tag created is `v0.0.7-dev` and in the commits made after the tag was created have changed the following files.

- `ci/pipeline.yml`
- `docs/CHANGELOG.md`
- `docs/README.md`

Given the following pipeline configuration:

```yml
steps:
  - task: GitGuardChanges@0
    displayName: 'Verify changelog'
    inputs:
      sourceCommitHash: 'tag:*-dev'
      targetCommitHash: 'HEAD'
      matchPattern: 'docs/CHANGELOG.md'
      matchStrategy: 'single'
      breakOnFailure: true
```

assume `matchPattern` will resolve the following files:

- `docs/CHANGELOG.md`

and the task will output:

- `gitGuardChangesResult`: `true`
- `gitGuardChangesCount`: `1`
- `gitGuardChangesMatches`: `docs/CHANGELOG.md`

## Verify all matched files have been changed

Assume the latest tag created is `v0.0.7-dev` and in the commits made after the tag was created have changed the following files.

- `ci/pipeline.yml`
- `docs/CHANGELOG.md`
- `docs/README.md`
- `packages/package-one/index.js`
- `packages/package-one/index2.js`
- `packages/package-two/index2.js`

Given the following pipeline configuration:

```yml
steps:
  - task: GitGuardChanges@0
    displayName: 'Verify changelog'
    inputs:
      sourceCommitHash: 'tag:*-dev'
      targetCommitHash: 'HEAD'
      matchPattern: '**/*/index2.js'
      matchStrategy: 'all'
      breakOnFailure: true
```

assume `matchPattern` will resolve the following files:

- `packages/package-one/index2.js`
- `packages/package-two/index2.js`

and the task will output:

- `gitGuardChangesResult`: `true`
- `gitGuardChangesCount`: `2`
- `gitGuardChangesMatches`:
  - `packages/package-one/index2.js`
  - `packages/package-two/index2.js`

and assume `matchPattern` will resolve the following files:

- `packages/package-one/index2.js`
- `packages/package-two/index2.js`
- `packages/package-three/index2.js`

and the task will output:

- `gitGuardChangesResult`: `false`
- `gitGuardChangesCount`: `2`
- `gitGuardChangesMatches`:
  - `packages/package-one/index2.js`
  - `packages/package-two/index2.js`
