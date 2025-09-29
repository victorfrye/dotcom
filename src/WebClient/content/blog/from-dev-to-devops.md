---
title: From Dev to DevOps
subtitle: Transforming mindset another way
description: Learning DevOps is not limited by technology skills. Here, we discuss the tooling and mindset that can help developers transition to DevOps engineers. 
date: 2025-09-29
image: assets/_blog/from-dev-to-devops/banner.jpg
tags:
  - devops
---

DevOps is more than a role; it's a culture and mindset that bridges the gap between development and operations. Any member of an IT organization or software company can embrace DevOps principles to improve collaboration, streamline processes, and enhance software delivery. Any person can carry more than one role. However, the literature for DevOps often starts with operations: system administrators, infrastructure engineers, and site reliability engineers (SREs). One of the best books on the topic, [The Pheonix Project](https://www.amazon.com/Phoenix-Project-DevOps-Helping-Business-ebook/dp/B0DPNL8863), is written from the perspective of an operations manager (and I highly recommend reading it). DevOps is about operations, but it is also about development. In truth, DevOps is about the entire software lifecycle and thus any person involved in it can learn and grow into a DevOps role. One such path is from developer to a DevOps engineer.

## The common guidance

The most common guidance for learning DevOps is to start with tooling from the operations perspective with recommendations to start with Linux or containers or Kubernetes. Some may find success this way, but I find it misleading. DevOps is difficult to learn first and these technologies are complex. It also does not matter if your code is executed in a container, virtual machine, or bare-metal on a Windows server to practice DevOps. However, a well-informed DevOps engineer knows why containerization is used and why choice of operating system matters. Instead, I recommend starting with what you know and building on that. If you want to learn DevOps, start with the various roles that practice it: developers, testers, operations engineers, or project managers. Here, I am focused on the developer role because that is my background and what I know best.

## The developer role

A developer is responsible for writing, testing, and maintaining code that forms the basis of software applications. They work with team members in various roles to:

- Understand requirements of what to build and translate them into functional software.
- Write clean, efficient, and quality code that is testable and maintainable.
- Ensure the software is buildable, deployable, and operational in installed environments.
- Deliver software that meets user needs and business goals in a timely manner.

One distinction is that a person may perform more than one role. For example, a developer may also be acting in the role of a manager, a designer, or a network engineer. The role of a developer is focused on developing software, but a person is often responsible for more than just writing code. Commonly, people in the developer role are also responsible for:

- Troubleshooting business applications and triaging why behavior is not as expected.
- Understanding legacy software and how they operate critical business logic.

In an enterprise and during a production incident, someone in the role of developer may be called to explain why insurance claims are still pending or an appointment booking failed. At the intersection of operations and development, a developer may be the first to know when a database failure or network outage is causing business disruption. In this way, developers are already acting outside of the limited scope of writing code. This is where DevOps comes in.

## The DevOps shift

DevOps is about the entire software lifecycle and the interrelationships between traditional developer and operations roles. A person in the role of both developer and DevOps engineer is responsible for:

- Understanding the entire software lifecycle, from planning feature requirements and writing code to deploying and maintaining applications in production.
- Developing the solutions that support the software lifecycle, such as CI/CD pipelines, infrastructure in the form of code, and automating tests.
- Knowing the difference between code written and value delivered.

Being a DevOps engineer may never include a direct title change. However, it may represent a growth in responsibilities commonly required for promotion. A developer who understands how to implement DevOps practices in tooling is one who can understand architecture, processes, and the business value of their application and how to drive change with teams. These are requirements that lead to senior and principal engineer roles.

## Learning DevOps

### Build systems

As a developer, you are already working with various technologies used for DevOps. The first is your build system. Today, software is built often. You need to build your application locally multiple times to test changes. You may use pipelines to build your application in another environment for verifying changes in a pull request. If you want to move from developer to DevOps engineer, the first place to start is understanding how your code is built and how it is run in all the different environments.

With .NET, this means understanding the differences between the .NET SDK and runtime and the [dotnet CLI](https://learn.microsoft.com/en-us/dotnet/core/tools/) used to build, run, and publish code. For JavaScript, this means understanding the differences between development servers, bundling, and how static files are served in browsers. Every language has its own build tools and is different in execution environments. For .NET, the common language runtime (CLR) is used to run code on Windows, Linux, and macOS. For JavaScript, the runtime is the browser or Node.js. Understanding how your code is built and executed is critical to automation and maintenance. When you know this, you can begin to optimize and automate the process.

### Source control

Most developers are already using source control, such as Git, to store and collaborate on code. However, it is an underappreciated tool that is critical to developers and DevOps engineers alike. Source control systems are the foundation of collaboration and change management. GitOps is a practice that uses Git repositories as the source of truth for all kinds of code, including application code, infrastructure as code, configuration files, and CI/CD pipelines. Your branching strategies and pull request processes are key aspects of how you audit and manage change. Git is the tool, but GitOps is the adoption of DevOps practices for automation of operational concerns. Turns out this developer tool is also a DevOps tool.

### Command-line and scripting

The command-line is avoidable for most developers these days. IDEs and graphical interfaces often abstract away the need to use a command-line interface (CLI). However, CLIs are necessary for DevOps automation. You can know F5 runs your code in the IDE, but when authoring a pipeline you need to know the commands that do this. Sometimes it becomes a series of commands, at which point you transition from simple commands to scripting. Commonly, the recommended scripting language is Bash as it is the native shell on Linux. However, any scripting language will help you as you learn DevOps. You can learn PowerShell or Python and still accomplish much of what you need to do. The key is to learn how to automate tasks that you would otherwise do manually without your mouse. Bash, PowerShell, and Python are all cross-platform choices. Practice navigating your file system, managing installed apps, and running your build commands from the command line.

### Continuous integration and delivery

The best-known acronym in DevOps is CI/CD, which stands for continuous integration and continuous delivery (or deployment). As a developer, you may already be using CI/CD pipelines to build and test your code. It may be tied to your source control platform, such as GitHub Actions or Azure DevOps Pipelines, or GitLab CI/CD, or it may be a standalone system like Jenkins. This is likely the first tooling primarily associated with DevOps that you will start authoring as you learn the role of DevOps engineer. However, a pipeline in and of itself is not CI/CD. You can write a pipeline that copies source code to a server, but that does not give you continuous integration, delivery, or deployment. Continuous integration is improved through pipelines that compile code consistently, run tests to verify changes, or enforce quality through additional checks like linters and static code analyzers. Continuous delivery is about when your pipelines produce deployment-ready artifacts that are reusable and ready to deploy to any environment. Continuous deployment is achieved when your pipelines automatically deploy code to your environments without human intervention. A pipeline is a tool, but CI/CD is a practice and outcome. Learn pipeline tooling, but learn them with the goal of automating the steps needed for CI/CD.

### Hosting and runtime environments

As you learn pipelines and the concepts of CI/CD, you will also need to understand where your code is run. This can vary widely depending on your organization or application. You may be running on bare-metal servers, virtual machines, containers, or serverless environments. You may be running on-premises or in the cloud. You may be using a platform-as-a-service (PaaS) or infrastructure-as-a-service (IaaS). The key is to understand where your code is run, the benefits and trade-offs of each environment, and how to get your code there. Learning Kubernetes in-depth may help if your organization is using it, but it is overkill for a static website or hobby project. It also doesn't help if your organization isn't using containers. Instead, focus on learning the environment your code is run in already. What operating system is used? What cloud provider? Is there differences between the platform used in development versus production?

### Infrastructure as code

As you learn where your code is run, you will also need to learn how that environment is created and configured. This is where infrastructure as code (IaC) comes in and the developer skills you already possess can shine. IaC is the practice of defining your hosting and runtime environments through code. Various languages and tools exist for this, such as Terraform, Azure Bicep, Ansible, Pulumi, and PowerShell DSC. The value in IaC is the same as traditional source code: it is versioned, readable, and traceable. If you write something to create a virtual machine and never commit it to a central repository, it is lost. However, if you write a Terraform file to create a VM and commit it to source control, you can track changes, review history, and implement CI/CD practices to validate changes and achieve infrastructure automation. As a developer, you already know how to write code. You can learn IaC and apply your existing skills to an operations domain.

## Learning continues

The journey from developer to DevOps engineer is surprisingly natural evolution. Developers already know their application and the value it delivers. They already know how to write code and collaborate with others. They already know the software lifecycle and the pains of delivering software. Learning DevOps is about expanding their existing knowledge and skills to automate and optimize the concerns outside of developing new features. The best way to learn DevOps is not necessarily learning Linux or Kubernetes, but instead mastering the tools they are already using and expanding knowledge of the whole system. Learn your how your code is built, where it is run, and how it gets there. Automate the friction in the process. When you start there, the mindset of DevOps fits into place:

- When you know how your code is built, you can understand the impact of the runtime environment and why containerization may help with consistency.
- When you know source control concepts, you can apply them to infrastructure and pipelines for version control, collaboration, and traceability.
- When you know the command line, you can automate tasks like test execution and building your code for continuous integration.
- When you know pipelines, you can automate the delivery and deployment of your code for faster feedback and value delivery.
- When you know your hosting environment, you can optimize your code for scalability or zero-downtime deployments.
- When you know how to write high quality code, you can apply these same principles to infrastructure code for repeatable deployments and consistent runtime environments.

DevOps is not a set of tools or a team, but a fuzzier concept: a mindset and shared responsibility. The path to learning DevOps is likewise non-exact. The concepts and tooling mentioned are how I started to learn DevOps as a developer. Your path may be different, but the key is to start with what you know and use today. From there, you learn the adjacent concepts, the tooling, and the why behind it all. And then, you keep learning.
