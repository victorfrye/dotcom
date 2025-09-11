---
title: "Aspire Roadmap 2025: Code-first DevOps, polyglot, and AI"
description: A look at the recently published Aspire roadmap for 2025, focusing on its code-first DevOps evolution, polyglot aspirations, and AI orchestration, and more.
date: 2025-07-30
image: assets/_blog/aspire-roadmap-2025/banner.jpg
tags:
  - aspire
  - cloudnative
  - dotnet
  - javascript
  - azure
  - devops
  - ai
---

The Aspire team has recently published their [2025 roadmap](https://github.com/dotnet/aspire/discussions/10644), revealing an exciting evolution from local development orchestration to a comprehensive framework for DevOps concerns. [Aspire](/blog/posts/hello-aspire-breaking-down-key-features) launched with a code-first application model and instantaneous run experience, then expanded into deploy scenarios with publishers. This roadmap shows how it's becoming a complete code-first alternative to YAML-heavy DevOps toolchains while embracing polyglot development and AI workload orchestration.

While these are aspirational goals rather than firm commitments, they provide valuable insight into Aspire's direction. Let's explore the most compelling features and why they position Aspire as a game-changing DevOps framework for .NET, polyglot, and AI applications.

## Code-first DevOps

DevOps combines development (Dev) and operations (Ops) to deliver software faster and with higher quality. While DevOps is fundamentally about people and processes, the technology and tooling often involve tedious YAML configuration files for CI/CD pipelines and infrastructure management. Aspire is changing this by providing a code-first approach to local development, testing, and deployment, replacing configuration complexity with familiar programming languages.

### Local development

Aspire already excels at code-first application modeling in C#, expressing your entire architecture—databases, services, .NET projects, and polyglot components—then spinning it up locally with `aspire run`. No YAML configuration files, just standard .NET code that ideally mirrors your production architecture. The roadmap expands this with:

- **Improved container support**: Shell commands, scripts, and interactive debugging inside containers
- **Multi-repo support**: Native orchestration across multiple repositories  
- **Built-in runtime acquisition**: Automatic installation of Node.js, .NET, and other required runtimes

Aspire local development is a mature feature set already. These improvements focus on further simplifying the developer experience and tackling complex orchestration scenarios. Multi-repo support has been a long-standing pain point as many developers opt to separate components, like a frontend and backend, in separate repositories. Removing the monorepo requirement or custom cross-repo orchestration makes Aspire more accessible to many teams. You can already run polyglot applications in containers with Aspire, but continued improvements will allow more robust debugging and feedback loops with local containerized applications. The built-in runtime acquisition is both the most exciting and most daunting feature here. It may simplify the first run experience, which helps with onboarding and CI/CD pipelines and one area that I adore of Aspire. However, depending on its implementation, it could also lead to extra local machine complexity with Aspire managed runtimes versus system-wide runtimes. The local development experience is already fantastic and delivers the code-first developer experience Aspire promises. Therefore, I am optimistic that these improvements will build on that foundation.

### Testing

Aspire's code-first model and instant run experience create ideal conditions for integration and end-to-end testing. You can spin up your entire application stack locally, creating an instant integration test environment with minimal friction. The `Aspire.Hosting.Testing` package provides this test host for xUnit and other testing frameworks and allows you to benefit from Aspire features like intelligent resource state notifications that eliminate arbitrary sleep times in tests. The roadmap adds advanced testing capabilities:

- **Partial app host execution**: Run only specific components in tests to reduce overhead
- **Request redirection and mocking**: Control traffic between components for chaos engineering
- **Code coverage support**: Coverage collection and reporting for integration tests

Where local development is the mature foundation of Aspire, testing is currently a secondary benefit that often surprises users by revealing the true value of the framework. These improvements take the Aspire testing story to the next level. Aspire goes from being the startup tooling that manages your integration testing components to a chaos engineering and middleware validation powerhouse. The partial app host execution isn't limited to testing and reduces overhead in local development scenarios where certain components are not needed. In testing, this partial execution may allow each test to receive the benefit so API integrations can be isolated without starting up the frontend or further broken down to individual microservices that matter. Coupled together with request redirection and mocking of components, you could create test scenarios that simulate real-world failures between integrations and validate chaos behavior. Imagine chaos testing your application before you even deploy it from your machine with the same ease of unit testing. The code coverage support is the extra bonus reward: get code coverage metrics for your integration and chaos tests in a way that is often limited to unit tests? Yes, please! The roadmap suggests the current Aspire testing story is only in its infancy, and these improvements will make it a reason to adopt Aspire for testing alone if they materialize as envisioned.

### Deployment

Deployment bridges development and customer value delivery. Aspire's local orchestration model naturally extends to cloud deployment scenarios. Aspire has been expanding to include deployment targets and publishers, simplifying the process of getting your application into production.
Currently, Aspire publishes artifacts like Bicep, Docker Compose, and Kubernetes manifests. You can deploy any Aspire resource the same way you would without Aspire, but with it you get seamless delivery to deployment targets like Azure Container Apps. While deployment targets are limited and opinionated, the roadmap addresses key enterprise needs that are still missing:

- **Additional deployment targets**: Support for Azure App Service, Azure Functions, and improved Docker/Kubernetes workflows
- **Environment support**: Define dev/stage/prod environments with specific configurations and secrets
- **CI/CD pipeline generation**: Auto-generate GitHub Actions, Azure DevOps, and GitLab pipelines

Deployment is an emerging focus in the Aspire story. Azure Container Apps is the first focus for deployment target and flexible as a hosting platform, but it's not flexible enough for all enterprise scenarios even within corporate environments invested in Azure. The roadmap as expected promises more common Azure deployment targets for traditional .NET workloads like Azure App Service and Azure Functions, but it is still lacking in amazing [polyglot deployment targets like Azure Static Web Apps](/blog/posts/reviewing-aspirejs#deployment-targets). Environment support is critical for enterprise adoption as the majority of enterprises host multiple environments. DevOps practices may push us for consistency between environments, but there are always differences in configuration and secrets to isolate environments. The CI/CD pipeline generation in addition to environment support delivers on the idea of code-first DevOps: define your environments and application model in code, then generate the necessary pipelines to deploy it based on your code-first model. The overall deployment story is still evolving, but the question that will persist is whether Aspire can provide enough flexibility to meet the diverse needs of enterprises' existing applications. These features are a step in that direction. I hope the Aspire team delivers, and we see Aspire become a code-first framework for continuous delivery and deployment.

## Polyglot aspirations

Aspire is not just a .NET framework; it is a polyglot orchestration framework that allows you to model and run conjoined applications in various languages. .NET, JavaScript, Python, and more are all supported, but the only first-class experience is in .NET projects. With the app host authored in C#, the service defaults project providing .NET best practices, and NuGet client integrations for simplifying configuration in your application code, Aspire is an amazing .NET developer experience. You can [host JavaScript](/blog/posts/reviewing-aspirejs) and Python applications, but you don't get the same level of integration and tooling. The roadmap reveals the Aspire team's ambition to provide a first-class polyglot experience that extends beyond .NET:

- **Uniform client integrations**: Connection strings, configuration, and telemetry work consistently with new language support via npm (JavaScript) and pip (Python) packages
- **Templates and samples**: Quickstarts and documentation for C#, JavaScript, and Python
- **Cross-language app host**: Experimental WebAssembly support for multiple runtimes in a single process

The polyglot aspirations of Aspire are focusing on JavaScript and Python support first. The uniform client integrations with npm packages for JavaScript and other languages will get us closer to parity with the .NET experience. Improved documentation and more polyglot samples will also help as figuring out how to use Aspire currently relies on developers doing the translation between C# and other languages themselves. Technically a hosting integration, but if Aspire supports the `Aspire.Hosting.Testing` package in JavaScript I would be ecstatic. Documentation and packages together could elevate the polyglot experience to make Aspire stand out beyond traditional .NET developers. It may invite more developers to experiment with the .NET platform beyond Aspire as well.

The cross-language app host is a fascinating item and the one I find hardest to envision myself. Will this be a way to write the app host without .NET? Will it wrap all the runtimes in a single process on your computer? What will it actually look like? The roadmap tells us it is experimental, so it may never materialize, or it may be something we start to see soon. I will be watching this closely as it starts to take shape and the value becomes clearer.

## Artificial intelligence

While AI dominates software conversations, Aspire has focused on fundamental developer experience improvements rather than AI-first features. As AI applications continue to be mainstream, Aspire is positioned to apply its orchestration strengths to AI workloads. The roadmap outlines several AI-specific features:

- **Token usage visualization**: Real-time token counts, latency, and evaluation metadata in the dashboard
- **LLM-specific metrics**: Native support for generative AI telemetry, including model name, temperature, and function call traces
- **Azure AI Foundry**: Integration for building agent-based applications
- **Aspire MCP server**: Optional runtime endpoint exposing the Aspire model as an MCP server for AI agents

Building AI applications is itself a nascent discipline. The Aspire team appears to be taking a measured approach to AI integration instead of branding itself another set of AI-native tools. These Aspire AI features are focused on two key areas: observability and agents. Observability is another area Aspire already excels at with the Aspire dashboard. Token usage and LLM-specific metrics visualizations in the Aspire dashboard will be a wonderful addition to the existing telemetry and observability features. It stays true to the natural value of Aspire while also extending to needs of AI local development needs.

In agentic regards, Aspire works but has a lot of limitations. Existing AI integrations, like Azure OpenAI and Ollama, provide some options for local and cloud-hosted LLMs. The integration with Azure AI Foundry may extend the catalog and options for LLMs. It will be exceptionally interesting if the integration supports Azure AI Foundry Local capabilities to provide a unified catalog of models both locally and in the cloud. The Aspire MCP server likewise adds agentic capabilities to Aspire. Model Context Protocol (MCP) is becoming an industry standard for AI agents communicating, understanding, and interacting with outside systems. An Aspire MCP server could provide development tools like GitHub Copilot with deep context on your application model and all the resources Aspire manages. I am all for more intelligent development workflows. Like so many other technologies, Aspire is targeting AI trends and trying to provide its own value in the space.

## Aspire tooling

As Aspire evolves into a mature framework, its tooling ecosystem continues expanding beyond the core .NET SDK. The roadmap includes several improvements:

- **Aspire CLI**: Continued improvements and unified commands
- **WinGet and Homebrew installers**: Standard install support for Windows and macOS
- **VS Code extension**: Run, debug, and orchestrate polyglot Aspire applications in VS Code

The tooling of Aspire is a meta story and so are its roadmap items. The code-first DevOps value and the polyglot aspirations, they all deliver on a core premise of Aspire: a simplified developer experience. When the tooling to setup Aspire or interact with it isn't easy, the core premise is lost. The Aspire CLI has already started this meta story with my favorite command, `aspire run`, which provides a consistent way to run your Aspire hosted applications locally. Continued improvements to the CLI and other commands will help make it easier to adopt and utilize Aspire. The WinGet and Homebrew installers are similar in value and may simplify installing the Aspire CLI which is already more complex than it should be. Finally, the VS Code extension may help deliver on the polyglot aspirations of Aspire by making development with Aspire more accessible to the tools JavaScript and Python developers already use without relying on CLI knowledge. Sure, CLI commands mean you can do it today but installing the Aspire CLI and generating projects requires a [guide of the right CLI commands](/blog/posts/adding-aspire-cli-guide). Overall, the meta story of these tools is to simplify using Aspire so that Aspire can simplify your developer experience.

## Final thoughts

The [2025 roadmap](https://github.com/dotnet/aspire/discussions/10644) that the Aspire team published is an exciting glimpse into a rapidly evolving framework. Nothing is a commitment, but the vision tells a story of what Aspire is developing into: a code-first DevOps framework that simplifies local development, testing, and deployment while embracing polyglot development and AI orchestration. I am incredibly excited by this roadmap as it aligns with my own dreams for Aspire. I love what it is today and recommend it to every .NET developer and some polyglot developers. If the Aspire team can deliver on half of these features, it will only continue to be a game-changer for developing distributed applications.

Let me know what you think of Aspire and where it is going. Are you excited about the roadmap? Do you think Aspire can deliver on these promises? I would love to hear your thoughts and experiences with Aspire so far.
