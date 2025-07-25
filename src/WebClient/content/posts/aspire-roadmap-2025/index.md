---
title: "Aspire Roadmap 2025: Code-first DevOps, polyglot, and AI"
description: A look at the recently published Aspire roadmap for 2025, focusing on its code-first DevOps evolution, polyglot aspirations, and AI orchestration, and more.
date: 2025-07-25
preview: assets/_blog/aspire-roadmap-2025/banner.jpg
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

DevOps combines development and operations to deliver software faster and more reliably. While DevOps is fundamentally about culture and processes, the tooling experience often involves tedious YAML configuration files for CI/CD pipelines and infrastructure management. Aspire is changing this by providing a code-first approach to local development, testing, and deployment—replacing configuration complexity with familiar programming languages.

### Local development

Aspire already excels at code-first application modeling in C#, expressing your entire architecture—databases, services, .NET projects, and polyglot components—then spinning it up locally with `aspire run`. No YAML configuration files, just standard .NET code that ideally mirrors your production architecture. The roadmap expands this with:

- **Improved container support**: Shell commands, scripts, and interactive debugging inside containers
- **Multi-repo support**: Native orchestration across multiple repositories  
- **Built-in runtime acquisition**: Automatic installation of Node.js, .NET, and other required runtimes

Aspire local development is a mature feature set already. These features tackle further complex scenarios like multi-repo applications and containerized services while simplifying environment setup for new developers and CI/CD pipelines.

### Testing

Aspire's code-first model and instant run experience create ideal conditions for integration and end-to-end testing. You can spin up your entire application stack locally, creating an instant integration test environment with minimal friction. The `Aspire.Hosting.Testing` package provides this test host for xUnit and other testing frameworks and allows you to benefit from Aspire features like intelligent resource state notifications that eliminate arbitrary sleep times in tests. The roadmap adds advanced testing capabilities:

- **Partial app host execution**: Run only specific components in tests to reduce overhead
- **Request redirection and mocking**: Control traffic between components for chaos engineering
- **Code coverage support**: Coverage collection and reporting for integration tests

These features may transform testing from simple integration scenarios to comprehensive chaos testing with the component management of the Aspire test host.

### Deployment

Deployment bridges development and customer value delivery. Aspire's local orchestration model naturally extends to cloud deployment scenarios. Aspire has been expanding to include deployment targets and publishers, simplifying the process of getting your application into production.
Currently, Aspire publishes artifacts like Bicep, Docker Compose, and Kubernetes manifests. While deployment targets are limited and opinionated, the roadmap addresses key enterprise needs:

- **Additional deployment targets**: Support for Azure App Service, Azure Functions, and improved Docker/Kubernetes workflows
- **Environment support**: Define dev/stage/prod environments with specific configurations and secrets
- **CI/CD pipeline generation**: Auto-generate GitHub Actions, Azure DevOps, and GitLab pipelines

Deployment is an emerging focus in the Aspire story. Additional deployment targets will provide more flexibility to align with existing cloud infrastructure. Environment support is crucial for enterprises, which frequently host multiple environments. Pipeline generation further reduces YAML configuration needed, creating a truly code-first deployment experience.

## Polyglot aspirations

Aspire is extending beyond .NET to better support polyglot development—orchestrating JavaScript, Python, and other languages alongside .NET components. This positions Aspire as an invitation for non-.NET developers to experience the benefits of code-first DevOps. The roadmap includes several polyglot enhancements:

- **Uniform client integrations**: Connection strings, configuration, and telemetry work consistently with new language support via npm (JavaScript) and pip (Python) packages
- **Templates and samples**: Quickstarts and documentation for C#, JavaScript, and Python
- **Cross-language app host**: Experimental WebAssembly support for multiple runtimes in a single process

These features further democratize Aspire's code-first approach, making it accessible to the broader developer ecosystem beyond .NET. As polyglot support matures, I hope to see deployment targets valuable to JavaScript developers, like Azure Static Web Apps, gain priority alongside traditional .NET hosting options.

## Artificial intelligence

While AI dominates software conversations, Aspire has focused on fundamental developer experience improvements rather than AI-first features. As AI applications continue to be mainstream, Aspire is positioned to apply its orchestration strengths to AI workloads.

Current AI integrations—Azure OpenAI, Ollama, and GitHub Copilot in the dashboard—have limitations for local development. Ollama lacks multi-modal capabilities, while Azure OpenAI lacks flexibility given its model provider exclusivity. The roadmap addresses these gaps with features designed for comprehensive AI application development:

- **Token usage visualization**: Real-time token counts, latency, and evaluation metadata in the dashboard
- **LLM-specific metrics**: Native support for generative AI telemetry, including model name, temperature, and function call traces
- **Azure AI Foundry**: Integration for building agent-based applications
- **Aspire MCP server**: Optional runtime endpoint exposing the Aspire model as an MCP server for AI agents

These features fall into two categories: enhanced observability and agent development. The token usage and LLM metrics naturally extend Aspire's existing telemetry capabilities to AI workloads, providing essential monitoring during local development. Meanwhile, Azure AI Foundry integration and the MCP server create a foundation for building and orchestrating AI agents within the Aspire framework.

## Aspire tooling

As Aspire evolves into a mature framework, its tooling ecosystem continues expanding beyond the core .NET SDK. The roadmap includes several improvements:

- **Aspire CLI**: Continued improvements and unified commands
- **WinGet and Homebrew installers**: Standard install support for Windows and macOS
- **VS Code extension**: Run, debug, and orchestrate polyglot Aspire applications in VS Code

These improvements reduce friction for adoption and enhance the overall developer experience, particularly for polyglot developers who favor VS Code.

## Final thoughts

The Aspire 2025 roadmap reveals a comprehensive vision for code-first DevOps—from local development and testing to polyglot support and AI integration. If Aspire succeeds in delivering this vision, it will transform how we build, test, and deploy distributed applications by eliminating YAML configuration complexity in favor of familiar programming languages.

For .NET developers, now is an excellent time to adopt Aspire. For polyglot developers, the roadmap suggests Aspire is attempting to provide the same code-first benefits regardless of your language stack. Whether it fully materializes as envisioned or simply improves local development and testing, Aspire continues to be one of the most exciting developments in modern software engineering.
