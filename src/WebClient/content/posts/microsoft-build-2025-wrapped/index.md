---
title: Microsoft Build 2025 Wrapped
description: A recap of the most exciting announcements from Microsoft Build 2025 according to your friendly neighborhood developer.
date: 2025-05-22
preview: assets/_blog/microsoft-build-2025-wrapped/banner.jpg
tags:
  - ai
  - aspire
  - azure
  - cli
  - dotnet
  - events
  - github
  - windows
---

Microsoft Build 2025 has come and gone, and it has been a whirlwind of announcements, a buzzword storm of AI, and some hidden gems that you might have missed. Let's attempt to wrap up the highlights according to myself, your friendly neighborhood developer.

## AI Everywhere

Microsoft Build 2025 was all about artificial intelligence, with nearly every session including the words "AI", "MCP", or "Copilot". Whether we like it or not, AI is the current trend and Microsoft is all in. The company is integrating AI into nearly every product, from Azure to VS Code, and from Windows to .NET Aspire! That's right, even my favorite new .NET framework is getting the AI treatment. Not only were the sessions all about AI, but the keynote and announcements also had a heavy focus on intelligence and Copilot additions up and down the technology stack. Some of these need their own blog posts, but here are some of the highlights:

- **GitHub Copilot Coding Agent**: A new feature that allows developers to assign tasks to Copilot in the GitHub platform.
- **GitHub Copilot for .NET Aspire**: The Aspire dashboard now includes Copilot integration, allowing developers to chat with Copilot with Aspire context.
- **NLWeb**: A new protocol built on top of MCP that allows for natural language to be a first-class citizen in web development.
- **Azure AI Foundry**: New enhancements to Azure AI Foundry, including Foundry Local in preview—which brings models to your local machine—and Foundry Agent Service going to general availability.

I want to focus on the first two items here as they are the two I am closest to and the most excited about.

### GitHub Copilot Coding Agent

![GitHub Copilot Coding Agent hero](/assets/_blog/microsoft-build-2025-wrapped/copilot_coding_agent.jpg)

GitHub Copilot continues to evolve with the introduction of the new Coding Agent. This allows developers to assign development tasks to Copilot in GitHub. From there, Copilot takes over the developer inner loop and handles writing code, running tests, and drafting a pull request to integrate the changes. You can watch the PR draft in real-time to see the changes Copilot pushes and collaborate through comments to suggest changes. It even allows control over the MCP servers used in the development process. This sounds like the automated software engineer pitch, but instead it is being pitched for the tedious work developers often need to do, e.g. upgrading your .NET 8 project to .NET 10 this fall. It is in preview now, but requires a GitHub Copilot Pro+ or Enterprise license currently. Neither of which I have as they are expensive at $390 a year. I might need to review my training budget...

### GitHub Copilot for .NET Aspire

![GitHub Copilot for .NET Aspire hero](/assets/_blog/microsoft-build-2025-wrapped/copilot_dotnet_aspire.jpg)

Yeah that's right, [.NET Aspire](https://victorfrye.com/blog/posts/hello-aspire-breaking-down-key-features) is getting the Copilot treatment too! When launching the app from Visual Studio or Visual Studio Code, you will now see the familiar GitHub Copilot icon in the top right corner of the Aspire dashboard. Using it to test my own website, I asked it get traces and structured logs and it was able to identify that no telemetry exists but my web client application was in the running state. That's correct as I haven't configured any telemetry with the Next.js frontend just yet... I have been meaning to get to that.

![A screenshot of the .NET Aspire dashboard with GitHub Copilot. Copilot shows a question asked for "get traces and structured logs" and responds with a summary of the findings, a root cause investigation to issues found, and suggested next steps.](/assets/_blog/microsoft-build-2025-wrapped/aspire_dashboard_copilot.png)

Immediately, I am both impressed and annoyed. Will I use Copilot here? Probably, given work where I can use GitHub Copilot professionally and we are utilizing .NET Aspire. However it does not work when running from the dotnet CLI nor the aspire CLI. For me, this is a big miss even if it is a technical limitation as I am a command-line enthusiast and my workflows start in the terminal. Secondly, the AI-ification of .NET Aspire means more people may be turned off by the product due to AI fatigue in the industry. But for those fatigued and who want nothing to do with GitHub Copilot, you can disable it, thankfully. You can set the `ASPIRE_DASHBOARD_AI_DISABLED` environment variable to `true` in the app host `launchSettings.json` file to hide all Copilot UI elements.

```json
{
  "$schema": "https://json.schemastore.org/launchsettings.json",
  "profiles": {
    "https": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "https://localhost:17168;http://localhost:15027",
      "environmentVariables": {
        // ... other environment variables
        "ASPIRE_DASHBOARD_AI_DISABLED": "true" // Disable GitHub Copilot in Aspire
      }
    }
  }
}
```

## Open Source Commitments

![A screenshot of wsl CLI in Windows Terminal after the help argument was provided.](/assets/_blog/microsoft-build-2025-wrapped/wsl_cli.png)

Microsoft continues to be a major contributor to open source and announced a couple major projects moving from closed-source to the open on GitHub. The first is a long-time coming project, the Windows Subsystem for Linux (WSL). I first used WSL to port a Java stack to Windows. That stack was a nightmare to run on Windows due to a team optimizing for macOS workflows but we wanted to enable new developers to use standard Windows dev machines and stop requiring expensive macOS hardware for a cross-platform native toolchain like Java. Today, WSL is a major part of the Windows developer experience. And now, Microsoft is open-sourcing WSL to allow the community to contribute and innovate on the [project on GitHub](https://github.com/microsoft/wsl).

Another major project moving to open source is the GitHub Copilot Chat extension for Visual Studio Code. As more and more IDEs and text editors are adding AI features, the Copilot Chat extension is being moved to open source **AND** the code being integrated into the Visual Studio Code core codebase. This means the main AI UI experience for Visual Studio Code will become a first-class component of VS Code. Personally, I am excited about this as pushes the AI developer experience towards transparency and competing with other juggernauts like Cursor and Windsurf. This is also another blurred line between the GitHub org and the developer division at Microsoft. It is a small step, but a step in the right direction.

## New Command Line Editor

![A screenshot of Edit running in Windows Terminal. The README for the project is opened along with the About dialog in the foreground showing the name "Microsoft Edit" and version "1.0.0" information.](/assets/_blog/microsoft-build-2025-wrapped/edit_about.png)

A small footnote in the book of news and not mentioned in the keynote is my favorite announcement from Build: **Edit**. It is a command line text editor, similar to Neovim or Emacs, that pays homage to the classic MS-DOS editor with modern inspiration from VS Code. Edit allows for a modeless command-line interface, meaning you do not have to switch between command and edit modes like in Neovim. This makes it far easier to use for new developers or those unfamiliar with command-line workflows. I have already dropped it into my inner loop in favor of Neovim. There are a couple kinks to work out, but I see a ton of potential and community input to the app. It is already available to install via WinGet and launched with binaries for Windows and Linux. The source code is [available on GitHub](https://github.com/microsoft/edit), and issues and pull requests are already open for various features including macOS support and additional localization support.

## Closing Thoughts

Microsoft Build 2025 was a whirlwind and a lot to digest. There was a ton of AI innovation, some open source announcements, and cool new tools like Edit released. Like every year, where any of these new technologies go is up to community adoption and may change over time. It is also hard to catch everything, so I recommend you check out the [Book of News](https://news.microsoft.com/build-2025-book-of-news/) for a full list of announcements from Build. I look forward to seeing which of these technologies resonate with others. Until then, happy coding!
