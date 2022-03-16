# GitGuardChanges

---

**Check if certain files have been changed between two commits**

---

## YAML Snippet

```yaml
- task: GitGuardChanges@0
  inputs:
    sourceCommitHash: #Oldest commit hash to check from
    targetCommitHash: HEAD #Newest commit hash to check to  (Default `HEAD`)
    matchPattern: #Files to match
    matchStrategy: all #If single only a `single` result from `matchPattern` needs to be matched, else all.
    breakOnFailure: false #Break the build in addition to setting the result variables

```

### Arguments

| Argument                                    | Description                                                                                                                                                    |
| :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sourceCommitHash` <br />Source Commit Hash | **(Required)** Oldest commit hash to check from <br />                                                                                                         |
| `targetCommitHash` <br />Target Commit Hash | **(Required)** Newest commit hash to check to (Default `HEAD`) <br /> Default value: `HEAD`                                                                    |
| `matchPattern` <br />Match Pattern          | **(Required)** Files to match <br />                                                                                                                           |
| `matchStrategy` <br />Match Strategy        | **(Required)** If single only a `single` result from `matchPattern` needs to be matched, else all. <br /> Options: `all`, `single` <br /> Default value: `all` |
| `breakOnFailure` <br />Break on failure     | **(Optional)** Break the build in addition to setting the result variables <br />                                                                              |


### Output variables

These are the output variables the task sets:

| Name                   | Description                                       |
| :--------------------- | :------------------------------------------------ |
| gitGuardChangesResult  | Match result                                      |
| gitGuardChangesCount   | Count of number of matched files that was changed |
| gitGuardChangesMatches | List of file paths of files that was changed      |


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

```yaml
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

```yaml
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
