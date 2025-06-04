---
title: "Adding .NET Aspire: A command line user's guide"
description: A CLI enthusiast's guide to adding Aspire to your .NET projects using the dotnet CLI. Plus, how to install the aspire CLI for running Aspire applications.
date: 2025-06-04
preview: assets/_blog/adding-aspire-cli-guide/banner.png
tags:
  - aspire
  - cloudnative
  - dotnet
---

.NET Aspire is a new framework for building cloud-native distributed applications that simplifies local development and deployment. Aspire offers significant benefits through its application modeling and orchestration capabilities. But how do you actually add Aspire to your projects?

In this guide, I'll walk through command line options to adding Aspire into both new and existing applications. Whether you're starting from scratch or enhancing an established project, the dotnet CLI provides templates to generate projects, new solutions, or common standalone files. This post focuses on the Aspire project templates and another useful tool, the aspire CLI, using command lines for those interested in checking out .NET Aspire.

Let's dive into adding Aspire to your .NET projects through the command line!

## Adding Aspire to your project

You can do all of this in Visual Studio or the dotnet CLI, but I will be guiding with CLI commands as they are universal across all OSes and IDEs. Also, CLI is just more fun, right?

With Aspire, you will have two new projects in your solution: `AppHost` and `ServiceDefaults`. These can have any name, but these names are the standard. The `AppHost` project is your local environment entrypoint and where you will model your application. The `ServiceDefaults` sets up default configurations deemed best practice for distributed applications. To add these, you can use the Aspire project templates. Using the dotnet CLI, you can run the following command options:

### Install Aspire templates

First thing you'll have to do is install the Aspire project templates. This will provide the necessary scaffolding for any of the other commands below to work. You can do this by running the following command in your terminal:

```bash
dotnet new install Aspire.ProjectTemplates
```

You may have to append a `@X.X.X` version and/or the `--force` option to install a newer version of the templates.

### Option 1: Add AppHost and ServiceDefaults

To add both the `AppHost` and `ServiceDefaults` projects to your existing solution, you can run the following command:

``` bash
dotnet new aspire --name "MyAspireApp" --output .
```

This provides a both new projects. The `--name` option specifies the root solution name and both projects will be created as `MyAspireApp.AppHost` and `MyAspireApp.ServiceDefaults` in this example. The `--output` option specifies the current directory as the output location, but you can change this to any directory you prefer such as `src`.

### Option 2: Add AppHost only

If you only want to start with the `AppHost` project, you can run the following template option:

```bash
dotnet new aspire-apphost --name "MyAspireApp.AppHost" --output "AppHost"
```

This will create only the `AppHost` project. This provides the local orchestration and entrypoint for Aspire applications. For the above, the `--name` option now specifies the fully qualified project name, `MyAspireApp.AppHost`, and the `--output` option specifies a new directory called `AppHost` to contain these specific project files.

### Option 3: Add ServiceDefaults only

If you want to start with just the `ServiceDefaults` project, you can run the following command:

```bash
dotnet new aspire-servicedefaults --name "MyAspireApp.ServiceDefaults" --output "ServiceDefaults"
```

This will create only the `ServiceDefaults` project. This project is a shared .NET library that contains useful defaults for distributed applications, such as HTTP resiliency and health check configuration. The `--name` option specifies the fully qualified project name, `MyAspireApp.ServiceDefaults`, and the `--output` option specifies a new directory called `ServiceDefaults` to contain these specific project files.

### Option 4: Start a new solution with Aspire

One final option is the Aspire starter template. This will create a new solution with both the `AppHost` and `ServiceDefaults` projects, plus a Blazor web frontend and web API backend service. You can run the following command to create a new solution with all of these projects:

```bash
dotnet new aspire-starter --name "MyAspireApp" --output .
```

The resulting solution will contain at least four projects in a new solution:

- `MyAspireApp.AppHost`: The main entry point for the application.
- `MyAspireApp.ServiceDefaults`: A library of default services and configurations.
- `MyAspireApp.Web`: A Blazor web frontend.
- `MyAspireApp.ApiService`: An ASP.NET web API backend service.

## Installing the Aspire CLI

Okay, now that we have the Aspire projects set up, there's one more thing we might want: the aspire CLI. The aspire CLI is a preview tool that simplifies application startup. To install it, you can run the following command:

```bash
dotnet tool install --global aspire.cli --prerelease
```

After installing the CLI, you can run the `aspire --help` command to see usage and available options. Effectively, this CLI is a wrapper around the `dotnet run` command that removes the need to specify the `--project` option. It will automatically find the `AppHost` project in your solution and run it.

## Next Steps

At this point, you should have the Aspire projects you want in your solution and the aspire CLI installed. You can now start modeling your application in the `AppHost` project and customize the `ServiceDefaults` project to fit your needs.
