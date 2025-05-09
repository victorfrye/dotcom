---
title: "Multi-Stage Docker Builds: A .NET developer's guide"
description: A practical guide to crafting a multi-stage build for production-ready .NET Docker images.
date: 2025-05-09
preview: assets/_blog/multi-stage-docker-dotnet-guide/banner.png
draft: false
tags:
  - aspnet
  - cloudnative
  - devops
  - docker
  - dotnet
---

My Docker skills were getting rusty. My day-to-day work has shifted away from containerized workloads and more towards modernizing legacy systems or architecting serverless solutions. Somehow, I've also never drafted my own Dockerfile from scratch. Docker and containers are culturally synonymous, and both are core cloud native technologies that any modern developer should be familiar with. So, I decided to write my own multi-stage build for a .NET web API for fun. This post will explore the results and guide you based on my learnings.

For this post, I will be using .NET 10 in preview. The application is a simple web API with a single endpoint that returns "Hello, .NET!". You can find the code for this [here on GitHub](https://github.com/victorfrye/hellodotnet).

## What is a multi-stage build?

A traditional Dockerfile might follow the same pattern as a pipeline: You install your tooling, check out your source code, and build your artifacts. It might look something like this:

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:10.0-preview-alpine
WORKDIR /source

COPY src/WebApi/WebApi.csproj src/WebApi/
COPY test/Tests/Tests.csproj test/Tests/
COPY VictorFrye.HelloDotnet.slnx ./
RUN dotnet restore

COPY . .
RUN dotnet build -c Release --no-restore 

RUN dotnet test -c Release --no-build

RUN dotnet publish ./src/WebApi/WebApi.csproj -c Release --no-build -o /app

WORKDIR /app
USER $APP_UID
ENTRYPOINT ["dotnet", "VictorFrye.HelloDotnet.WebApi.dll"]
```

The problems with this approach are multifold. Firstly, the image is large. It is over **2 GB** as it contains all the build artifacts, including the .NET SDK and all the source code. The massive means you take a performance hit as the size corresponds to longer build and deploy times and is more expensive for storage and network transfers. Additionally, this is a security risk, as it exposes your source code which may contain intellectual property or sensitive information. We can optimize this all by using a multi-stage build.

Notice our first Dockerfile includes exactly one `FROM` statement. This means we reused the same base image for our build and runtime. In a multi-stage build, we use multiple `FROM` statements to separate our stages. This results in distinct images for our build and for production runtime. The build image will utilize the full .NET SDK and all of the source code. The runtime image will only include the ASP.NET runtimes and the artifacts we need to run our application. This results in a smaller production image, faster to build and deploy and with a reduced attack surface.

## Writing the multi-stage Dockerfile

The first thing we need to do is decide on our base images. For production, I know this is an ASP.NET web API and want to keep it slim. We do not want the SDK included and only need that ASP.NET runtime and its dependencies for. As for our Linux flavor, Alpine is my go-to choice as it's stripped down to the essentials and security minded. Keep in mind that Alpine is not always the best choice for every application. Thus, I will be using the `mcr.microsoft.com/dotnet/aspnet:10.0-preview-alpine` image for our production **base** image. For our **build** image, we want to align architecture to production but need the full .NET SDK. This means we will use the `mcr.microsoft.com/dotnet/sdk:10.0-preview-alpine` image. For deciding on yours, I recommend browsing the [Microsoft Artifact Registry](https://mcr.microsoft.com/).

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview-alpine AS base
LABEL com.github.owner="victorfrye"
LABEL com.github.repo="hellodotnet"
USER $APP_UID

FROM mcr.microsoft.com/dotnet/sdk:10.0-preview-alpine AS build
WORKDIR /source
```

Notice the `AS` keyword and the names we have assigned. This is how we can reference our stages later. In the production **base**, we can set additional production configurations including the USER or add labels. Now that we have our base images, we can start to compile our application.

For our **build**, we first need to install our dependencies and run a `dotnet restore`. To do this, we need to copy our solution and project files into the build image. Remember Docker uses layers and caching to optimize images so small steps in our build create efficiencies.

```dockerfile
COPY src/WebApi/WebApi.csproj src/WebApi/
COPY test/Tests/Tests.csproj test/Tests/
COPY VictorFrye.HelloDotnet.slnx ./
RUN dotnet restore
```

Next, we need to copy the rest of our source code into the **build** image and build our binaries for release. We also want to explicitly ensure we are not repeating the previous steps.

```dockerfile
COPY . .
RUN dotnet build -c Release --no-restore 
```

At this point we are wrapping up our initial build stage. Our builder still needs to run our tests and publish, but like a pipeline we can separate these into their own stages. This is good practice as it allows Docker to fail fast and create a logical separation of concerns. Our next stage will be our **test** stage and use the build stage as its base. It will execute our tests without rebuilding and fail the image builder if they do not pass.

```dockerfile
FROM build AS test
RUN dotnet test -c Release --no-build
```

Now we can move on to our final builder stage: **publish**. This stage will use the **test** stage including the previous build and test steps.  We need to reference the test stage to ensure the full chain of events is executed. The goal of publishing is to output the compiled binaries and dependencies to a directory. They are the artifacts our application needs to run in production. We want to be explicit about our output directory as we will use it in our final image.

```dockerfile
FROM test AS publish
RUN dotnet publish ./src/WebApi/WebApi.csproj -c Release --no-build -o /out
```

We are almost done! We have our entire builder and within it the artifacts we want. Our builder now ensures a repeatable process and environment for portable consistency. The last step is to copy our artifacts to our production base image as our **final** stage. We will be using that **base** stage we defined at the beginning and copying the artifacts from the **publish** stage. We will then be setting our application entry point to the compiled DLL artifact for our application.

```dockerfile
FROM base AS final
WORKDIR /app
COPY --from=publish /out .
ENTRYPOINT ["dotnet", "VictorFrye.HelloDotnet.WebApi.dll"]
```

## The final result

Putting all our stages together, we still have a single Dockerfile. My result looks like this:

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview-alpine AS base
LABEL com.github.owner="victorfrye"
LABEL com.github.repo="hellodotnet"
USER $APP_UID

FROM mcr.microsoft.com/dotnet/sdk:10.0-preview-alpine AS build
WORKDIR /source

COPY src/WebApi/WebApi.csproj src/WebApi/
COPY test/Tests/Tests.csproj test/Tests/
COPY VictorFrye.HelloDotnet.slnx ./
RUN dotnet restore

COPY . .
RUN dotnet build -c Release --no-restore 

FROM build AS test
RUN dotnet test -c Release --no-build

FROM test AS publish
RUN dotnet publish ./src/WebApi/WebApi.csproj -c Release --no-build -o /out

FROM base AS final
WORKDIR /app
COPY --from=publish /out .
ENTRYPOINT ["dotnet", "VictorFrye.HelloDotnet.WebApi.dll"]
```

This includes multiple stages but benefits from a smaller production image size of **167.5 MB**, down from our initial **2 GB**! That is over a 80% reduction in size and includes none of the source code or build artifacts. It also benefits from faster build times as changes to various stages only require rebuilding the subsequent stages. My favorite part is how similar the structure is to a non-containerized pipeline or GitHub Actions workflow. You move from setup to build to test to publish to production-ready artifacts.

Writing this Dockerfile was a fun exercise and preparation for me in working heavily with Docker again. Hopefully, it also helps you understand the mental process, structure, and benefits of a multi-stage build.
