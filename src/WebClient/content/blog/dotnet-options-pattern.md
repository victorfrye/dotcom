---
title: .NET Options Pattern
subtitle: Binding settings and user secrets
description: Let's explore the .NET Options pattern and how it can be used to bind application settings and user secrets in your application.
date: 2025-06-04
image: assets/_blog/dotnet-options-pattern/banner.jpg
tags:
  - dotnet
---

Configuration management is a crucial aspect of building applications. Whether locally or in the cloud, you need a way to manage settings and secrets without hardcoding values everywhere. In .NET, the options pattern is a powerful out-of-the-box approach to binding configuration values from just about any source, including JSON files, environment variables, user secrets, and even cloud configuration providers.

In this article, we'll explore the .NET options pattern, how to set it up in your application, and some key features for flexibility in your application.

## What is the Options Pattern?

The options pattern is a .NET design pattern that provides a way to bind configuration values to strongly typed classes. This allows us to take advantage of object-oriented programming principles, such as type safety and separation of concerns, while also extracting values from various configuration stores. In .NET, the options pattern is implemented through the `Microsoft.Extensions.Options` and `Microsoft.Extensions.Configuration` libraries, already included in frameworks like ASP.NET Core, and the base `IOptions<TOptions>` interface.

I consider the options pattern table stakes for any .NET application as it cleanly separates application code from configuration. Local development can use JSON files and user secrets, while production can use remote configuration stores like Azure App Configuration and Key Vault, all without changing your code. You can even mix and match local and remote sources for dev/test integrated local development. This flexibility significantly improves developer productivity and application maintainability.

## Setting Up the Options Pattern

To get started with the options pattern, you need 3 things:

1. A settings class that represents the configuration values you want to bind.
2. A configuration source, such as your `appsettings.json` file or user secrets.
3. A binding and registration of the settings class.

In this example, we'll be binding a simple settings class for configuration values related to calling a downstream API. You can find the complete code for this example in the [GitHub repository](https://github.com/victorfrye/hellooptions).

### The Settings Class

When defining your settings classes, you will want to split apart your settings based on their consumption. This allows us to separate the concerns of different parts of our application configuration and later will make it easier to consume using dependency injection. In this case, we have only one settings class named `PlaceholderApiSettings` that contains a base URL, an API key, and an optional version number:

```csharp

using System.ComponentModel.DataAnnotations;

public sealed class PlaceholderApiSettings
{
    internal const string SectionName = $"{nameof(PlaceholderApiSettings)}";

    [Required]
    public required Uri BaseUrl { get; set; }

    [Required]
    public required string ApiKey { get; set; }

    public string Version { get; set; } = "v1";
}
```

You will notice that we also have a constant for the section name. Since we might have multiple settings classes, it is a good idea to define sections in our configuration to avoid overlapping settings. Additionally, we are using the `Required` attribute and `required` keyword to denote we expect these properties to always be set, whether via constructor or binding. These are all optional elements.

The requirements for a settings class are simple: we need field names that express our expected configuration sources to also use.

### The Configuration Sources

The options pattern binds configuration values from any source supported by `Microsoft.Extensions.Configuration`. That includes:

- Your `appsettings.json` file
- Environment variables
- .NET Secrets Manager (aka user secrets)
- Azure App Configuration
- Azure Key Vault
- And more!

For our example, we will use the `appsettings.json` file and user secrets. Recalling our section name in the settings class, we can define a section and two field values in our `appsettings.json` file like this:

```json
{
  // Other configuration settings...
  "PlaceholderApiSettings": {
    "BaseUrl": "https://jsonplaceholder.typicode.com/todos",
    "Version": "v1",
  }
}
```

We can nest our settings under our section name or nest that under further prefixes for any settings we may want to group together. We are creating a fully qualified path to each setting field for any configuration source we bind equivalent to what we are expecting, `PlaceholderApiSettings:BaseUrl` for example. This value might differ by environment, but as long as we have one value set per environment by any configuration source available in that environment, we can bind it to our settings class.

Sometimes we have sensitive information that we don't want to commit in source code. Here, we can use the .NET Secrets Manager to store and still bind sensitive values like API keys. To do this, we can use the `dotnet user-secrets` command group in the dotnet CLI. If you haven't already initialized user secrets for your project, you can do so with the following command:

```bash
dotnet user-secrets init --project "Path/To/Your/Project.csproj"
```

This command will add a `UserSecretsId` property to your project file, which uniquely identifies your project. This ID allows you to store secrets safely outside of your source code.

From here, we can now add our API key to the secrets file with the following command:

```bash
dotnet user-secrets set "PlaceholderApiSettings:ApiKey" "SuperSecretApiKey123" --project "Path/To/Your/Project.csproj"
```

This command will create or update the `secrets.json` file with the key-value pair for our API key. The resulting file will look something like this:

```json
{
  "PlaceholderApiSettings:ApiKey": "SuperSecretApiKey123"
}
```

Now we have two configuration sources with the various values set.

### Binding the Options

The final step towards setting up the options pattern is binding and registration of our settings class. This is where the `Microsoft.Extensions.Options` library comes into play. In our `Program.cs` entry point, we need to add the options, configure the binding source, and, optionally, validate the settings to ensure they meet our expectations. To do this, we can use the `AddOptions`, `BindConfiguration`, and `ValidateDataAnnotations` method chain on the `IServiceCollection`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOptions<PlaceholderApiSettings>()
                .BindConfiguration(PlaceholderApiSettings.SectionName)
                .ValidateDataAnnotations();

// Registration of other services and configuration...

var app = builder.Build();

// The rest of your application setup...

await app.RunAsync();
```

The `AddOptions<T>` method gets the options builder for our settings class, allowing us to configure it. The `BindConfiguration` method takes the section name from our settings class, telling the options builder the configuration section path to bind to (in this case, `PlaceholderApiSettings:*`). Finally, the optional `ValidateDataAnnotations` method tells the options builder to use the data annotations we defined to validate the values during binding. You can use other validation methods, such as `ValidateOnStart` or `Validate` to perform validation at different times or with custom logic. The key is we have a strongly typed settings class and a section path that aligns with the keys in our various configuration sources.

After this setup, we now have multiple new classes registered in our dependency injection container that we can use to access our settings.

## Consuming the Options

We have defined our settings class, configured our sources, and bound our options. Now we need to consume them in our application. The options pattern has already three interfaces implemented that we can use to access our settings:

- `IOptions<T>`: A singleton instance bound with the settings values at start up.
- `IOptionsSnapshot<T>`: A scoped instance that can be used to access settings in transient or per-request services and can be configured to reload on changes.
- `IOptionsMonitor<T>`: A singleton instance that can be used to access settings singleton scenarios and also supports change notifications.

Instances of all three interfaces are pre-configured in our dependency injection container by the `AddOptions` method chain and can be used in any service through constructor injection. The base use case is the `IOptions` interface, though the later two support advanced scenarios like refreshing settings during runtime. In our example, we will use the `IOptions<PlaceholderApiSettings>` to access our settings in client class for our placeholder API.

Using dependency injection, we can retrieve our settings now like this:

```csharp
using Microsoft.Extensions.Options;

public class PlaceholderClient(IOptions<PlaceholderApiSettings> options)
{
  private readonly PlaceholderApiSettings _settings = options.Value;

  // Omitted methods for brevity
}
```

Through constructor injection of the options interface of our choice, we can access the bound settings class and all its members through the `Value` property. Now, we can use the `_settings` field to access any of the properties we defined include the base URL from our JSON source and API key from our user secrets source in this `PlaceholderClient`.

## Conclusion

The .NET options pattern is a simple, unified way to manage and consume configuration values in our applications. By defining custom settings classes, we get the benefits of type safety and the separation of concerns. We are able to consume values from multiple configuration sources like our application settings or user secrets locally and remote configuration stores like Azure App Configuration or Key Vault in the cloud. Finally, by binding our settings to configuration paths, we can easily access them through dependency injection and reap the benefits of inversion of control in our application. All together, this design pattern offers a flexible foundation for managing configuration values in .NET applications.

If you want to explore more about the options pattern, you can find additional resources and extensions in the official [Microsoft Learn documentation](https://learn.microsoft.com/en-us/dotnet/core/extensions/options).
