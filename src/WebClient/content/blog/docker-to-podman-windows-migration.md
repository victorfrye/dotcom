---
title: Docker Desktop to Podman
subtitle: A Windows developer's migration guide
description: A quick guide for Windows developers to transition from Docker Desktop to Podman.
date: 2026-01-20
image: assets/_blog/docker-to-podman-windows-migration/banner.jpg
tags:
  - cloudnative
  - devops
  - docker
  - podman
  - windows
---

Docker is synonymous with containers. For years, Docker Desktop has been the go-to solution for Windows developers to build, run, and manage containers locally without complex setups and for ease of use. However, alternatives have emerged and matured and Docker Desktop licensing has stopped being free for many users and enterprises. One such alternative is Podman, a daemonless container engine that offers Docker compatibility and a similar hassle-free experience for Windows developers. This post will guide you through the steps to migrate from Docker Desktop to Podman on Windows.

## Docker licensing

There are many reasons Docker Desktop remains a staple for Windows developers. There's even more for why Docker became the de facto standard for containers. However, [Docker Desktop licensing has stopped being free](https://docker.com/pricing/) for many users and enterprises. This change did not include the open-source Docker Engine, which remains free to use and includes the command-line interface, as well as Docker Compose. This change disproportionately impacts Windows users. On macOS and Linux, Docker works seamlessly due to unix-like operating systems and Linux container compatibility. On Windows, WSL is the underlying technology that makes the Docker engine work and requires a lot of complex setup to interact with across Windows and WSL. Docker Desktop abstracts this complexity away.

What always bothered me about moving away from Docker Desktop was the lack of a simple solution that provided a similar onboarding experience. Enter Podman.

## Why Podman?

Podman is an open-source container engine that provides a Docker-compatible CLI and API. It is sponsored by [Red Hat](https://redhat.com) and has gained significant traction in the container ecosystem. Podman offers several advantages over Docker Desktop, but the most compelling are compliance and parity. You can utilize Podman without worrying about licensing fees, and with a quick series of steps, you can get the same benefits of Docker Desktop including a GUI, WSL integration, Docker CLI compatibility, and container management without the cost.

So how do you get started?

## Set up Podman on Windows

Some assumptions before we begin:

- You are running Windows 10 or later.
- You already have WSL installed and set up on your Windows machine. If not, you can follow the [Microsoft documentation](https://learn.microsoft.com/en-us/windows/wsl/install) to get started.
- You have Docker Desktop installed currently. If not, you can skip step 1 below.

### 1. Uninstall Docker Desktop

This is the most important step. If you have Docker Desktop installed, it may conflict with Podman. It may also make you non-compliant with Docker's licensing terms. Uninstall Docker Desktop completely. One way to do this is through WinGet, the Windows package manager, if you installed it that way or via the Microsoft Store. You can run the following command in a terminal:

```bash
winget uninstall Docker.DockerDesktop
```

### 2. Install Podman and related tools

There are multiple ways to install Podman on Windows. I recommend using WinGet because command-line tools are precise and repeatable. I also just love using the terminal.

There are additional tools that we will install alongside Podman to provide a similar experience to Docker Desktop. These include:

- **Podman**: The core container engine and podman CLI.
- **Podman Desktop**: A GUI that provides similar administrative capabilities to Docker Desktop and orchestrates Docker compatibility.
- **Docker CLI**: The open-source and free Docker CLI for continued compatibility with `docker` CLI commands.
- **Docker Compose**: The open-source tooling for multi-container orchestration, powering `docker compose` and `podman compose` commands (optional).
- **Kubectl**: The Kubernetes CLI for managing and interacting with Kubernetes clusters (optional).
Each of these maps directly to a WinGet package and is easily identifiable by ID. If you do not want to install any of the optional tools, simply omit them from the commands below. To install all of these tools, run the following commands in a terminal:

```bash
winget install --id RedHat.Podman --exact
winget install --id RedHat.Podman-Desktop --exact
winget install --id Docker.DockerCLI --exact
winget install --id Docker.DockerCompose --exact
winget install --id Kubernetes.kubectl --exact
```

After installation, you should be able to run `podman version` in your terminal to verify Podman is installed correctly. You can also launch Podman Desktop and see the desktop application GUI.

### 3. Enable Docker compatibility in Podman Desktop

Okay, now we have all of our tools installed. The next step is to enable Docker compatibility in Podman Desktop. This will allow all Docker tools to utilize the Podman engine. Unfortunately, you have to leave the CLI to do this.

1. Open **Podman Desktop**
2. Go to **Settings** on the navigation bar.
3. Expand the **Preferences** section.
4. Click on **Docker Compatibility**.
5. Toggle **Enabled** to on for Docker compatibility.

After this, you should have a new **Docker Compatibility** section which shows system socket status, Podman Compose CLI support and Docker CLI context. That Docker CLI context is very important. It means any `docker` commands you run in your terminal will now utilize Podman as the backend engine! This is the magic that makes the transition seamless.

### 4. Verify the setup

At this point, assuming installations succeeded and no UI changes confounded you, you should be ready to go! Let's verify everything is working correctly with some simple commands:

First, let's check the Podman version:

```bash
podman version
```

You will notice output that includes a `Client` and `Server` section, similar to Docker. Most important to note is the server version. Podman Desktop runs the podman machine in WSL for us. If you are seeing issues here or with podman commands, you may want to restart your computer and ensure Podman Desktop is auto-running the podman machine. You can check this with the following command:

```bash
podman machine list
```

This command should show a running machine named `podman-machine-default` and I would expect the last up time to be `Currently running`.

Now, let's verify Docker CLI compatibility by running:

```bash
docker version
```

This should output two sections again: `Client` and `Server`. The server section should match the Podman server version from earlier. This means your Docker CLI is successfully talking to the Podman engine!

The last thing to do is verify we can pull and run a container. You can use any hello world, but I like using the Microsoft MCR Hello World image. Let's do it:

```bash
docker run mcr.microsoft.com/mcr/hello-world:latest
```

You should see output similar to the following:

```text
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

In our case, the Docker client actually contacted the Podman engine. You can also skip the `docker` CLI and run the same command with `podman`:

```bash
podman run mcr.microsoft.com/mcr/hello-world:latest
```

## The end result

At this point, you have successfully migrated from Docker Desktop to Podman on Windows! You can continue using all your existing Docker CLI commands and workflows, but now with Podman as the backend engine. You also have a GUI with Podman Desktop that provides similar functionality to Docker Desktop.

For additional reading about containers, consider learning about [multi-stage builds](/blog/posts/multi-stage-docker-dotnet-guide). Otherwise, happy containerizing with Podman!
