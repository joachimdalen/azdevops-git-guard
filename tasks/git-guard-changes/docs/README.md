# {{ #task-field[task=git-guard-changes;field=friendlyName;] }}

---

**{{ #task-field[task=git-guard-changes;field=description] }}**

---

## YAML Snippet

{{ #task-input[task=git-guard-changes;type=example] }}

### Arguments

{{ #task-input[task=git-guard-changes;type=table] }}

### Output variables

These are the output variables the task sets:

{{ #task-field[task=git-guard-changes;field=outputVariables;] }}

# 📜 Commit Query

"Commit Query" allows you resolve certain git hashes dynamically. It is basically just a selector for what git commands should be run in the background.

- `tag:<matchFormat>`: Fetches the latest tag matching the format

### Examples

Assume the repo contains two tags, `v0.0.7-dev`, `v0.0.8-dev`, and `v0.0.9` the following `tag:v*-dev` expression would resolve to the latest tag created. In this case `v0.0.8-dev`. The query `tag:v*[!-dev]` would resolve `v0.0.9`.

# ❓ Pipeline Examples

## Verify a single file has been changed

Assume the latest tag created is `v0.0.7-dev` and in the commits made after the tag was created have changed the following files.

- `ci/pipeline.yml`
- `docs/CHANGELOG.md`
- `docs/README.md`

Given the following pipeline configuration:

{{ #include-partial[file=single-file;wrap=yaml] }}

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

{{ #include-partial[file=all-files;wrap=yaml] }}

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
