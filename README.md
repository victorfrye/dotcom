# VictorFrye.COM

A personal portfolio website for your friendly neighborhood developer

[![Azure Static Web Apps CI/CD](https://github.com/victorfrye/dotcom/actions/workflows/azure-swa.yml/badge.svg)](https://github.com/victorfrye/dotcom/actions/workflows/azure-swa.yml)
[![CodeQL](https://github.com/victorfrye/dotcom/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/victorfrye/dotcom/actions/workflows/github-code-scanning/codeql)
[![GitHub Issues](https://img.shields.io/github/issues/victorfrye/dotcom)](https://github.com/victorfrye/dotcom/issues)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](/LICENSE)

## Overview

VictorFrye.COM is a personal portfolio website for myself, Victor Frye, your friendly neighborhood developer. This project provides the following to connect others with my work and interests:

🌐 A React static web application to engage with users interested in connecting.

🛠️ .NET Aspire to orchestrate the local development environment because of my love for developer productivity.

🚀 GitHub Actions for CI/CD because automation breeds modern software.

## Table of Contents

- [Overview](#overview)
- [Table of Contents](#table-of-contents)
- [Get Started](#get-started)
  - [Prerequisites](#prerequisites)
  - [Clone the repo](#clone-the-repo)
  - [Run the app](#run-the-app)
- [License](#license)

## Get Started

### Prerequisites

To run this project, you will need to have the following software installed on your machine:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/)
- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download)
- An IDE or text editor of your choice, e.g.:
  - [Visual Studio](https://visualstudio.microsoft.com/downloads/)
  - [Visual Studio Code](https://code.visualstudio.com/download)
- An OCI compliant container runtime, e.g.:
  - [Docker Desktop](https://www.docker.com/get-started/)

### Clone the repo

To clone the repository, run the following command in your terminal:

```pwsh
git clone https://github.com/victorfrye/dotcom.git
```

### Run the app

To run the application, simply run the following commands in the root of the project:

```pwsh
dotnet run --project ./src/AppHost/AppHost.csproj
```

## License

Copyright (c) Victor Frye. All rights reserved.

Licensed under the [MIT](/LICENSE) license.
