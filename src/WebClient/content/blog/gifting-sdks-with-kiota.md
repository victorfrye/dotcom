---
title: Gifting SDKs with Kiota
subtitle: Let Kiota play Santa with generating SDKs for your ASP.NET Core web APIs
description: Ho ho ho! In this festive season, let's explore how Kiota can help you generate SDKs for your ASP.NET Core web APIs, making it easier to share your services with others.
date: 2025-12-05
image: assets/_blog/gifting-sdks-with-kiota/banner.jpg
tags:
  - dotnet
  - openapi
---

Merry Christmas and happy holidays! It's time for a [C# Advent](https://csadvent.christmas/) blog post.

'Tis the season to be jolly, and what better way to spread joy than by gifting SDKs for your ASP.NET Core web APIs? In this festive post, we'll explore how Kiota, a code generator for OpenAPI described APIs, can help you create C# SDKs for your services, making it easier for others to integrate and use them.

Some assumptions and clarifications before we begin:

- You already have an OpenAPI document for your application. It can be a file saved locally or served from a URL endpoint.
- In this post, we'll focus on generating C# SDKs using Kiota, but Kiota also supports other languages like TypeScript, Java, and Python.
- Kiota can generate SDKs for any OpenAPI described API, not just ASP.NET Core web APIs. However, for this post, we'll specifically look at ASP.NET Core. We're C# developers after all!

In this blog post, we'll utilize an existing OpenAPI document and generate a C# SDK using Kiota.

## What is Kiota?

Every good gift starts with understanding what you're giving. One of the major innovations in .NET is the [OpenAPI.NET](https://github.com/microsoft/OpenAPI.NET) library, which moves OpenAPI support to first-class status within the .NET platform. [Kiota](https://github.com/microsoft/kiota) is a Microsoft code generator that leverages this library to create SDKs for OpenAPI described APIs. It supports multiple programming languages, including C#, TypeScript, Java, and Python. There's plenty of other code generators out there, but this tight integration with OpenAPI.NET and Microsoft support makes it a compelling choice.

I discovered Kiota while exploring ways my team could generate SDKs for a plethora of new microservices. A common problem in microservice architectures is each service exposes its own API and any consumers need to know the (1) the available endpoints, (2) the model definitions, and (3) write the client code to call the service. This is a lot of boilerplate work that is tedious and error-prone. An OpenAPI document helps describe the API surface and models, but a code generator like Kiota can take this a step further by generating the exact client code needed to call the service, including models, request builders, and serialization logic.

## Installing Kiota

Santa has made it easy for .NET developers to get started with Kiota. It is available as a .NET tool, which means you can install it once globally or add it as a local tool to your project. To install Kiota globally, run the following command:

```bash
dotnet tool install --global Microsoft.OpenApi.Kiota
```

We can verify the installation by checking the version:

```bash
kiota --version
```

## Set up an SDK project

Before we continue, we need an SDK project. Kiota can generate a client that you include in existing projects, but building an SDK project is a great way to package and distribute the code via NuGet. Your customers don't care how you built the SDK; they just want the gift of ready-to-use code.

Let's create a new class library project for our SDK:

```bash
dotnet new classlib --name Sdk --output ./src/Sdk
```

Next, we need to add some dependencies to our SDK project. Kiota-generated clients rely on a few NuGet packages for abstractions, serialization, and HTTP handling. We can add these packages using the `Microsoft.Kiota.Bundle` package reference. Run the following command in the SDK project directory:

```bash
dotnet package add Microsoft.Kiota.Bundle --project ./src/Sdk/Sdk.csproj
```

Let's now clear any existing code such as the default `Class1.cs` file created by the class library template. Kiota will create everything we need in our SDK project.

## Generating the client with Kiota

Now that we have our SDK project set up, it's time to generate the client code. I am going to use an OpenAPI document hosted locally for demonstration purposes, but you can use any OpenAPI document accessible via a URL or file path. Like a good Christmas wishlist, Kiota has several options to customize the generated code. We'll use some good defaults for this example and explain why they matter:

```bash
kiota generate \
    --language csharp \
    --openapi https://localhost:7045.yaml \
    --output ./src/Sdk \
    --class-name ChristmasApiClient \
    --namespace-name VictorFrye.MerryChristmas.Sdk
```

Here's a breakdown of the options used:

- `--language csharp`: Specifies that we want to generate a C# client. The language option is crucial given Kiota's multi-language support.
- `--openapi`: The path or URL to the OpenAPI document describing the API. This is the heart of the generation process.
- `--output`: The directory where the generated code will be placed. We point this to our SDK project but it could be a directory in an existing application.
- `--class-name`: The name of the main client class to generate. The default is `ApiClient`, but giving it a meaningful name like `ChristmasApiClient` makes it clear what service this client interacts with and avoids naming conflicts.
- `--namespace-name`: The namespace for the generated code. This helps organize the code and should align with your project's namespace conventions.

After running the command, Kiota will generate models, api request builders, and our api client class in the specified output directory. You will also see a `kiota-lock.json` file that captures the generation settings for future reference.

We now have our gift-wrapped SDK ready to be shared!

## Using the generated SDK

With our SDK generated, it's time to see how we can use it in an application. Let's create a simple console application that utilizes the `ChristmasApiClient` to interact with our ASP.NET Core web API. We'll use a C# file-based application for simplicity:

```csharp
#!/usr/bin/env dotnet

#:project ../src/Sdk/Sdk.csproj
#:package Microsoft.Kiota.Bundle@1.21.0

using Microsoft.Kiota.Http.HttpClientLibrary;
using Microsoft.Kiota.Abstractions.Authentication;
using VictorFrye.MerryChristmas.Sdk;

var baseUrl = args.Length > 0 ? args[0] : "https://localhost:7045";

var client = new ChristmasApiClient(new HttpClientRequestAdapter(new AnonymousAuthenticationProvider())
{
    BaseUrl = baseUrl
});

Console.WriteLine(await client.Api.Christmas.GetAsync());

```

This demo is very lightweight, but gives a sneak peak at our gifted SDK in action. We create an instance of the `ChristmasApiClient`, configure it with a base URL, and make a call to the `GetAsync` method on the `Christmas` endpoint. The generated client handles all the HTTP communication, serialization, and deserialization for us.

The biggest trick of any generated code is understanding how to use it. The real gift: we don't have to write any of the boilerplate code ourselves. The generated SDK does all the heavy lifting, allowing us to focus on building out and consuming our APIs.

## Final thoughts

Code generation is a powerful tool that can save developers significant time and effort. Kiota made it easy to generate SDKs for OpenAPI described APIs, and given its tight integration with the .NET ecosystem, it was a natural choice for my microservices project. This example walks through a C# SDK, but multi-language support means you can gift SDKs for your frontend developers in TypeScript or a data science team in Python.

If you need additional reference material, check out the official [Kiota documentation](https://learn.microsoft.com/en-us/openapi/kiota/) for more details on languages, options, and advanced usage scenarios. You can also explore my [Secret Santa repository](https://github.com/victorfrye/secretsanta) which contains the sample ASP.NET Core web API and a Kiota-generated SDK and samples.

Happy holidays and this festive season, give the gift or a ready-to-use SDK with Kiota! Ho ho ho!
