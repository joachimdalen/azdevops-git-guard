<div id="top"></div>
<br />
<div align="center">
  <a href="https://github.com/joachimdalen/azdevops-git-guard">
    <img src="extension-icon.png" alt="Logo" width="100" height="100" />
  </a>

  <h3 align="center">Git Guard</h3>

  <p align="center">
    GitGuard is an extension that contains a various set of tasks that can be used to verify certain git related contitions in pipelines
    <br />
    <a
      href="https://github.com/joachimdalen/azdevops-git-guard/blob/master/docs/index.md"
      ><strong>Explore the docs »</strong></a
    >
    <br />
    <br />
    <a
      href="https://marketplace.visualstudio.com/items?itemName=joachimdalen.gitguard"
      >View Extension</a
    >
    ·
    <a
      href="https://github.com/joachimdalen/azdevops-git-guard/blob/master/CHANGELOG.md"
      >Changelog</a
    >
    ·
    <a href="https://github.com/joachimdalen/azdevops-git-guard/issues"
      >Report Bug</a
    >
    ·
    <a href="https://github.com/joachimdalen/azdevops-git-guard/issues"
      >Request Feature</a
    >
  </p>
</div>

<div align="center">
  <img
    alt="Azure DevOps builds"
    src="https://img.shields.io/azure-devops/build/dalenapps/6531387f-baea-443c-a284-0d0e786e56c3/43?color=0078d7&label=Master%20Build&logo=azure-devops&style=flat-square"
  />
  <img
    alt="Issues"
    src="https://img.shields.io/github/issues/joachimdalen/azdevops-git-guard.svg?style=flat-square"
  />
  <img
    alt="License"
    src="https://img.shields.io/github/license/joachimdalen/azdevops-git-guard?style=flat-square"
  />
</div>
<div align="center">
  <img
    alt="Visual Studio Marketplace Installs - Azure DevOps Extension"
    src="https://img.shields.io/visual-studio-marketplace/azure-devops/installs/total/joachimdalen.gitguard?label=Marketplace%20Installs&style=flat-square"
  />
  <img
    alt="Visual Studio Marketplace Last Updated"
    src="https://img.shields.io/visual-studio-marketplace/last-updated/joachimdalen.gitguard?style=flat-square"
  />
  <img
    alt="Visual Studio Marketplace Rating"
    src="https://img.shields.io/visual-studio-marketplace/r/joachimdalen.gitguard?style=flat-square"
  />
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#limitations">Limitations</a></li>
        <li></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li>
      <a href="#release-and-merge-strategy">Release and merge strategy</a>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

An issue I often face is forgetting to update the state of a parent workitem when starting a new Task. This extension aims to auto update parent workitems based on a set of rules when the child workitem is started.

## Getting Started

### Prerequisites

- A MarketPlace publisher [Create a publisher](https://docs.microsoft.com/en-us/azure/devops/extend/publish/overview?view=azure-devops#create-a-publisher)
- `tfx-cli` installed.

  ```sh
  npm install -g tfx-cli
  ```

- Pipelines uses the following extensions that needs to be installed in your organization in addition to default tasks:
  - [GitGuard](https://marketplace.visualstudio.com/items?itemName=joachimdalen.gitguard) - Used to verify changes to files, such as changelog.
  - [Azure DevOps Extension Tasks](https://marketplace.visualstudio.com/items?itemName=ms-devlabs.vsts-developer-tools-build-tasks) - Used to build and publish extension.

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/joachimdalen/azdevops-git-guard.git
   ```

2. Install dependencies

   ```sh
   > npm install
   ```

3. Update publisher in `vss-extension.dev.json`
4. Compile development version

   ```sh
   npm run prepare:dev
   ```

5. [Publish extension](https://docs.microsoft.com/en-us/azure/devops/extend/publish/overview?view=azure-devops#publish-an-extension)
6. [Share](https://docs.microsoft.com/en-us/azure/devops/extend/publish/overview?view=azure-devops#share-an-extension) and [install](https://docs.microsoft.com/en-us/azure/devops/extend/publish/overview?view=azure-devops#install-an-extension) extension

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

See [documenation](./docs/index.md) for usage.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/joachimdalen/azdevops-git-guard/issues?q=is%3Aopen+is%3Aissue+label%3A%40type%2Ffeature) for a full list of proposed features.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are welcome, both in the form of suggestions and code.

If you want to contribute code, I ask that you follow some guidelines.

- New and changed features should to the best ability be covered by tests
- Follow the branching policy:
  - `feature/` for new features
  - `bugfix/` for bug fixes
  - `docs/` for documentation changes
- If your change is related to an issue, use the id as the first part of the branch e.g `bugfix/12-fix-crash-when-updating-rule`
- Pull requests should target the `develop` branch

1. Fork the Project
2. Create your Feature/Bugfix/Docs Branch (`git checkout -b feature/1-some-change`)
3. Commit your Changes (`git commit -m 'Add some change'`)
4. Push to the Branch (`git push origin feature/1-some-change`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## Release and merge strategy

- `master` is only deployed to `PROD` and tagged with `v<extension_version>`
  - Pull requests are always squash merged into `master`
  - `master` is the only branch where GitHub releases are created for
- `feature/*` and `bugfix/*` are deployed to `DEV`.

`DEV` is a private development environment (publications of the extensions.)

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

If you have generic questions about the project or usage you can make contact in the following ways:

- Submit an issue with the `@type/question` label - [New Issue](https://github.com/joachimdalen/azdevops-git-guard/issues/new)
- Submit a new question under the [Marketplace Q&A section](https://marketplace.visualstudio.com/items?itemName=joachimdalen.gitguard&ssr=false#qna).

<p align="right">(<a href="#top">back to top</a>)</p>
