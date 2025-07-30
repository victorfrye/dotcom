---
title: "Reviewing Aspire.JS: Current state of Aspire for JavaScript"
description: A review of Aspire for JavaScript, an orchestration framework for polyglot applications, including current state, personal experiences, and future aspirations.
date: 2025-07-30
preview: assets/_blog/reviewing-aspirejs/banner.jpg
tags:
  - aspire
  - cloudnative
  - dotnet
  - javascript
  - azure
---

Aspire is the coolest thing in software development right now. That's a statement I frequently make, but it comes from a place of genuine excitement for this nascent framework that is transforming how we can model, run, and deploy applications. Local development with Aspire is effortless regardless of the complexity of your architecture. Aspire is a part of the .NET platform, but it extends past .NET to provide polyglot orchestration for JavaScript, Python, and other languages.

One reason I refer to Aspire as the coolest thing in software development is my frequent use of it in JavaScript projects. Whether it's a simple static site or a full-stack application, Aspire has become my go-to tool for local development.

This post is a review of Aspire for JavaScript including current state, my personal experiences, and future aspirations. If you are a JavaScript, .NET, or polyglot developer interested in Aspire, this analysis is for you. If you are not familiar with Aspire, you may want to read a [breakdown of its key features](/blog/posts/hello-aspire-breaking-down-key-features) first.

## Current state

Aspire in its current state is a code-first orchestration framework written in C# but enabling local development and hosting of polyglot applications. JavaScript and .NET exist in harmony with Aspire. Given the common stack of a JavaScript web frontend, a .NET web API backend, and a containerized database or other backing services, Aspire hosts the entire stack and abstracts away the different mechanisms for running and connecting each component.

The above stack is the apparent assumption of Aspire for JavaScript. Aspire allows for modeling and running JavaScript backends, full-stack JavaScript applications, and scripts, but given the .NET-first nature of Aspire, you will be writing some C# code if you use Aspire. Accepting this for the app host, the orchestrator and C# model, Aspire provides two extension points of note for JavaScript development: Integration packages and deployment targets.

### Integrations packages

Integration packages are the libraries that extend Aspire to support the various projects, executables, containers, and services that make up your application. These packages are hosted as NuGet packages and can either be hosting or client integrations. Hosting integrations extend the app host of Aspire to model and run components like a JavaScript web app. Client integrations are libraries that allow you to consume the Aspire configurations and defaults to connect to the hosted components. However, client integrations are exclusive to .NET projects given they are packed as NuGet packages.

This still leaves a variety of hosting integrations for JavaScript development to benefit from. The following are some of the most relevant:

- **[Aspire.Hosting.NodeJs](https://www.nuget.org/packages/Aspire.Hosting.NodeJs)**: Provides hosting for Node.js applications via node or npm scripts
- **[CommunityToolkit.Aspire.Hosting.Bun](https://www.nuget.org/packages/CommunityToolkit.Aspire.Hosting.Bun)**: Provides hosting for Bun applications
- **[CommunityToolkit.Aspire.Hosting.Deno](https://www.nuget.org/packages/CommunityToolkit.Aspire.Hosting.Deno)**: Provides hosting for Deno applications
- **[Aspire.Hosting.PostgreSQL](https://www.nuget.org/packages/Aspire.Hosting.PostgreSQL)**: Provides hosting for PostgreSQL database via [Docker Hub registry postgres images](https://hub.docker.com/_/postgres)
- **[Aspire.Hosting.MongoDB](https://www.nuget.org/packages/Aspire.Hosting.MongoDB)**: Provides hosting for MongoDB database via [Docker Hub registry mongo images](https://hub.docker.com/_/mongo)
- **[Aspire.Hosting.Redis](https://www.nuget.org/packages/Aspire.Hosting.Redis)**: Provides hosting for Redis via [Docker Hub registry redis images](https://hub.docker.com/_/redis)
- **[Aspire.Hosting.Azure.Storage](https://www.nuget.org/packages/Aspire.Hosting.Azure.Storage)**: Provides hosting for Microsoft Azure cloud storage services, including Blob, Queue, Table, and Azurite emulation
- **[Aspire.Hosting.Testing](https://www.nuget.org/packages/Aspire.Hosting.Testing)**: Provides a test host for .NET unit testing frameworks

Overall, the packages provide flexibility of hosting JavaScript apps with the Node.js, Bun, or Deno runtimes. Databases and cloud service hosting include popular JavaScript data solutions like PostgreSQL, MongoDB, Redis, and Azure Blob Storage. Together, Aspire still provides the same local development experience for JavaScript application as it does for .NET with instantaneous runs and abstractions over other configuration files. The major deficits are you must minimally write C# code for the Aspire app host and to consume the Aspire host for testing, you will need to write integration tests using .NET testing frameworks like xUnit. For true polyglot developers familiar with both JavaScript and .NET, this is a non-issue that provides all the benefits of Aspire with the flexibility of using JavaScript for what JavaScript is best at. However, for a JavaScript only developer, there are extra barriers to entry here that Aspire has yet to solve.

### Deployment targets

Deployment is an emerging focus in the Aspire story. Applications orchestrated with Aspire can be deployed anywhere the same way you would deploy without Aspire, however the focus here is deployment through Aspire. Aspire is expanding to include publishers and deployment targets, taking your modeled application and using it to generate artifacts like Bicep and container images. Given Aspire's origins in .NET and Microsoft solutions, the initial deployment targets are opinionated and limited. By default, the easiest deployment target is [Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/overview), a serverless platform for running containerized applications. However, there is a fundamental flaw here for JavaScript developers: hosting with Azure Containers Apps assumes you need a server.

JavaScript developers are accustomed to a true serverless experience, one in which the web browser is the host environment. Frameworks like Next.js allow for server-side computation, but many JavaScript frameworks and applications are designed to run entirely in the browser using a bundle of JavaScript, HTML, and CSS. This has a lot of benefits for developers, including:

- **No server management**: No need to manage servers or containers, just a static file host
- **Instant scaling**: Static files can be served from a CDN, scaling automatically with demand
- **Lower costs**: Static file hosting is often cheaper than running containers or VMs

And so much more. This is antithetical to traditional .NET development and represents a fundamental difference in JavaScript versus .NET. Some JavaScript developers may opt for containerized hosting due to enterprise infrastructure or for self-managed static web servers like Nginx, but Azure already provides a first-class static web hosting solution with [Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/overview). Azure Static Web Apps are nowhere to be found in the Aspire deployment story, which is a major gap for Aspire for JavaScript.

## My Aspire.JS story

To understand how Aspire fits JavaScript development currently and potentially in the future, it is helpful to understand how a developer who has adopted Aspire already uses it. I am a full-stack developer who currently favors .NET for backend development, React for frontend development, and Azure for cloud hosting. I started using Aspire for a sample .NET web API that I wanted to run on macOS and Windows, so that anyone could pull down the code and run it with minimal configuration. Aspire was perfect for this, so I started using it for all my .NET projects. This in turn led me to use Aspire to host a React frontend alongside my web API and database, which also proved to be effortless. Finally, I asked the question: _Why not use Aspire for my JavaScript only projects?_

I have 3 static sites that I maintain, including my personal blog, and I wanted to use Aspire for local development to provide a consistent local development experience across all my projects. It works. Every personal project, including live websites or demo applications, is locally orchestrated with Aspire by default. I also recommend it for any enterprise .NET project I work on. However, the barrier of recommendation stops at projects that do not include .NET components currently. Aspire is currently an excellent choice for .NET and polyglot projects that include .NET, but the benefits of Aspire for JavaScript only or polyglot projects without .NET are not an easy sell. The C# app host, NuGet client integrations, and lack of polyglot deployment targets that do not align are all barriers to entry for JavaScript developers.

The C# app host is a non-issue for me as a .NET developer, but for any project not already using .NET, it means extra SDKs to install and a new language to learn. Admittedly, the app host is not complex C# code until you start creating your own custom components. It is the download of the .NET SDK that is the high barrier. The NuGet client integrations are less a barrier and more a missing feature to sell the value story. Finally, deployment targets are a nascent feature in a nascent framework. I started using Aspire without its deployment features due to feature immaturity. To this day, I favor Azure Container Apps or Azure Functions for .NET workloads and Azure Static Web Apps for JavaScript workloads and handle deployment separately from Aspire. Together, this means the Aspire story for non-.NET applications adds .NET as a development dependency and is missing client integrations and deployment flexibility I would expect for recommendation.

## Future aspirations

Aspire recently published their [2025 roadmap](/blog/posts/aspire-roadmap-2025), which includes several features that may solve the current limitations of Aspire for JavaScript. The most exciting are:

- **Polyglot client integrations**: Connection strings, configuration, and telemetry work consistently via npm packages as they do with existing NuGet packages for .NET projects
- **Templates and samples**: More documentation and quickstart examples for JavaScript
- **Cross-language app host**: An experimental WebAssembly app host that may reduce .NET friction for JavaScript developers authoring the Aspire app host

These features may further make Aspire an accessible choice for JavaScript developers and provide some of the .NET exclusive benefits for JavaScript components in your applications. The npm client integration packages excite me the most as a polyglot developer because it would allow me to integrate databases and cloud services like Azure Storage into my JavaScript components with the same reduced configuration as Aspire is doing for .NET projects. This adds parity in developer experience and closes the gap for recommendation and adoption of Aspire for JavaScript development. Documentation improvements are also always welcome and ease adoption. The cross-language app host is interesting, but I am still unsure of what it may amount to or if it'll even materialize. If it does, maybe it removes the .NET SDK download as a barrier. These features are directional and not commitments but provide a hope for increased parity with Aspire .NET developer experience.

The remaining gap is deployment. This is an emerging area and the .NET story itself is still evolving for deploying with Aspire. However, I am actively watching for how this matures and the targets that get first-class support. If static hosting targets like Azure Static Web Apps are added, Aspire for JavaScript becomes a much more compelling recommendation. If Aspire only provides first-class support for traditionally .NET hosting targets like Azure App Service, Azure Functions, and Azure Container Apps, then the polyglot story remains incomplete.

## Final assessment

Aspire is the coolest thing in software development right now and is actively evolving. For polyglot developers familiar with .NET, Aspire is a game-changer and you should experiment with adding it yourself. However, for JavaScript development and polyglot applications without .NET, there are still barriers to entry that prevent Aspire from being a compelling recommendation. Can you do it? Absolutely. Do I use Aspire for JavaScript development? Yes. Do I recommend it for JavaScript only projects? Not yet. But maybe in the future. Maybe soon.
