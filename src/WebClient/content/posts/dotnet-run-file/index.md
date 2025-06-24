---
title: "dotnet run file.cs: The new file-based application model"
description: Let's explore the dotnet run file.cs paradigm for writing file-based .NET applications and the new value it brings to the .NET ecosystem.
date: 2025-06-23
preview: assets/_blog/dotnet-run-file/banner.jpg
tags:
  - dotnet
---

I missed something at [Microsoft Build 2025](https://victorfrye.com/blog/posts/microsoft-build-2025-wrapped): the announcement of the new `dotnet run file.cs` model in [.NET 10 Preview 4](https://devblogs.microsoft.com/dotnet/dotnet-10-preview-4/). This is a new paradigm for running and writing .NET applications and if you are reading this, you might not be the target of this feature. However, you will probably meet or read C# code that is written this way.

This article will explore the new feature of `dotnet run file.cs` and the value it brings to the .NET ecosystem. Run it!

## The Current Project-Based Model

Today, if I wanted to write a simple C# console application that output "Hello, World!", I need to do the following:

1. Install the .NET SDK.
2. Install an IDE or text editor like Visual Studio or Visual Studio Code.
3. Create a new .NET project using the IDE or the `dotnet new` CLI command.
4. Write my code in the `Program.cs` file.

None of this is changing, or at least the steps. However, the output of this today is as given the command: `dotnet new console --name HelloWorld`:

```text
File actions would have been taken:
  Create: ./HelloWorld.csproj
  Create: ./Program.cs

Processing post-creation actions...
Action would have been taken automatically:
   Restore NuGet packages required by this project
```

The above is the dry run output of the `dotnet new` command. Notice two files are created: `HelloWorld.csproj` and `Program.cs`. The `csproj` file is an XML file that contains information any .NET developer is all too familiar with. The `Program.cs` file is where I write my code. Additionally, you will quickly see `obj` and `bin` directories created and start populating as you write and publish your application. Do you know what both directories are for, even today? Do you find XML friendly to read? Microsoft asked a new question: Is this all overwhelming for someone new?

The keyword above was **new**. I invite you to recall your days learning to code and suppress your experienced instincts. When I do, I remember sitting in a classroom feeling like I might never understand programming and would fail. C# was my first language. We have bootcamps, universities, and online courses in excess to help new developers. That is working, but they are learning JavaScript or Python. Why? Because the onboarding experience is easier. The barrier to entry lower.

What if this changed? Introducing the new `dotnet run file.cs` paradigm.

## The New File-Based Model

The `dotnet run` we keep discussing is the Dotnet CLI command any .NET command-line user is familiar with. However, the `file.cs` is in reference to a new single file-based application model. That means in our steps from earlier, we change them to the following:

1. Install the .NET SDK.
2. Install an IDE or text editor like Visual Studio Code.
3. Create a new C# file, e.g. `hello.cs`.
4. Write my code in the `hello.cs` file.

The steps are incredibly similar but also simplified. You need the .NET SDK and a tool for writing code still, but you no longer need to understand a complex project generation process and only have one file to manage. Let's review it:

```csharp
#!/usr/bin/dotnet run
#:sdk Microsoft.NET.Sdk.Web
#:property AssemblyName VictorFrye.HelloWorld

var app = WebApplication.CreateBuilder(args).Build();

app.UseHttpsRedirection();

app.MapGet("/hello", () => "Hello World!");

await app.RunAsync();
```

That is it. I could link to a repository, but if you copy and paste this you get a complete .NET application you can run. There is no `csproj` file, and `obj` and `bin` directories are not created in your working directory. And if you run the command `dotnet run hello.cs`, you get an active Kestrel web server that responds with "Hello World!". The latter half of the code is top-level statements, a feature not so new. However, the first three lines are special.

The first line is a shebang: a Unix convention that tells the system how to execute the file. In this case, it tells the system to use the `dotnet run` command to execute the file. With this new paradigm, you must have the .NET SDK installed and Dotnet CLI available still. A shebang is not required, but it does enable running the file without explicitly calling `dotnet run` on Unix-like systems. This is cool, but mostly just a convenience.

The second and third lines are new directives. You may be using directives in your code today, such as `#if DEBUG` or `#region Feature X`. However, the new `#:` directives are unique to the run file paradigm. The `.csproj` file normally tells our .NET application critical information like SDKs, MSBuild properties, or NuGet packages to use. The run file paradigm still supports these, but instead you use a `#:sdk` directive or `#:property` directive. In this case, I'm using the `Microsoft.NET.Sdk.Web` SDK to pull in ASP.NET Core features for web APIs and setting the assembly name to `VictorFrye.HelloWorld` because I like my name. These new directives are only for the run file paradigm, and you will get warnings if you try to use them in a traditional project model.

Behind the scenes, everything is still there. The project file still exists but is virtual and interpreted by the Dotnet CLI. The `obj` and `bin` directories are created, but in a temporary location that is abstracted away. The application is still built and run like any other .NET application. The difference is in the simplicity of authoring C#. However, when the project reaches maturity or someone is ready to take it to the next level, they can convert the file-based application to a traditional project-based application. All you must do is run the following:

```bash
dotnet project convert hello.cs
```

## The Value Added

I am really excited about the `dotnet run file.cs`. The primary users targeted are new developers. This is a win if Microsoft succeeds and more developers embrace modern .NET applications. Some might be concerned about not learning all the details of the full project-based application model, but new developers learning .NET mean a larger .NET community, new libraries, and more innovation in the ecosystem. This is a huge win for the .NET developer community.

However, the value added doesn't stop there. File-based applications are also great for scripts and small utility apps. You don't need a folder structure or a csproj file. You can now write a couple C# scripts to help you maintain your existing codebase or automate tasks. This is a huge win for scripting capabilities and reducing project overhead.

Another use-case is one you might have to read yourself: .NET samples. Sample applications are used by libraries to showcase how to use specific features or APIs. They are also used by conference speakers and at meetups to illustrate concepts or provide live demos of features. In this article itself, I would normally have to create a full project to demonstrate the feature, and I would link the repository so a reader could copy it exactly and reference it or run it themselves. Now, I can provide the entire sample in a code block that is easy to copy and paste. This is a huge win for documentation and sample authors.

## The Limitations So Far

Right now, file-based applications are limited to a single file. They are also unsupported in Visual Studio, favoring Visual Studio Code as a more likely editor for targeted users. Finally, it is only in .NET 10 Preview versions at the moment. It will not be until November 2025 that we see the first general availability release of file-based applications and likely time after before we see new developers learning in this form or a C# scripting revolution.

## Concluding Remarks

The `dotnet run file.cs` paradigm is a new way to write and run .NET applications. It may or may not be for you, but the goal is a more inclusive and accessible .NET ecosystem. The best outcome is more developers learning and using .NET. Maybe C# scripts take off and we see C# become the new Python. Maybe documentation and sample applications get less verbose. The future is hard to predict, but I am hopeful for a future where I see file-based C# applications in the wild.
