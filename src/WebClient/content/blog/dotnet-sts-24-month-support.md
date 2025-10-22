---
title: .NET STS 24-Month Support
subtitle: How 6 more months changes your upgrade strategy
description: Microsoft has extended the short-term support (STS) policy for .NET, providing 24 months of support for each release. Let's dive into what this means for enterprise developers planning their upgrade and support strategy.
date: 2025-10-22
image: assets/_blog/dotnet-sts-24-month-support/banner.jpg
tags:
  - dotnet
---

Microsoft has announced an update to the short-term support (STS) policy for .NET releases, [extending the length of support from 18 months to 24 months](https://devblogs.microsoft.com/dotnet/dotnet-sts-releases-supported-for-24-months/). This goes into effect with the already released .NET 9. Not enough people are talking about this, but it significantly changes the conversation around which .NET versions to use in production.

This post will break down what this means for developers and organizations planning their .NET upgrade and support strategy. Let's dive in.

## Standard term, long term

.NET has been using a short-term, long-term support model for .NET releases. The short-term support (STS) releases included odd-number releases while long-term support (LTS) releases were even-numbered. The below covers the currently supported and anticipated .NET versions:

| Version |  Support Type  |
|---------|----------------|
| .NET 8  | LTS            |
| .NET 9  | STS            |
| .NET 10 | LTS (Nov 2025) |
| .NET 11 | STS (Nov 2026) |

All together, this is not a lot of versions. The bi-annual release cadence of LTS releases and off-year STS releases leaves us with a simple lineup of supported versions. There is additional complexity in out-of-band components, but the majority of conversation around .NET support focuses on the major versions annually released each November.

When it comes to supporting languages, frameworks, and runtimes, the conversation always forms around what the upgrade cadence looks like to stay in support and stay stable. With .NET, the major versions have a clear release window, have predictable support through Microsoft, and (despite some legacy concerns) have proven to be stable for production enterprise usage at launch regardless of support duration. Each release includes shiny new features and performance improvements that make upgrading to the latest version desirable, but it takes time and effort. This means the upgrading is the primary tax when choosing whether to utilize .NET STS releases. This also has been where STS consistently fails. But that is changing with the new 24-month support window for STS releases.

## Upgrade tax

Developers love to use the latest and greatest technology, including new versions. However, enterprises are limited by their ability to spend the time needed to upgrade. When applications transition from growth or active work to maintenance mode, the ability to upgrade decreases significantly. The technology landscape means this transition from active to legacy can happen within months or even weeks. We still need to upgrade to maintain our security posture, apply bug fixes, and keep up with compliance requirements. However, upgrading is a tax that enterprises pay. This tax is paid in time, resources, and potential disruption to the business. The longer the support window, the more time enterprises have to plan and execute upgrades, reducing the overall tax.

In many languages, the upgrade tax is only worth it when using LTS versions because the STS support window was too short to justify the risk of being unable to upgrade in a timely fashion. The .NET STS releases suffered from this problem with 18-month support windows. To understand this better, let's review what this would look like when choosing between .NET STS and LTS releases of what is current:

### 18-month STS scenario

A year ago, November 2024, .NET 9 was to be released and the decision to be made: do we stay on .NET 8 LTS version or upgrade to .NET 9 STS version? We have the time and momentum to upgrade to .NET 9, but the upgrade tax needs to include consideration for the following upgrade. Staying on .NET 8, support would end in November 2026, at which time .NET 10 would have a year of support left and .NET 11 would be freshly launched. However, if we decided to upgrade to .NET 9, we would have to upgrade again in 18 months, which would be May 2026 and the actively supported versions would be .NET 8 and .NET 10. STS releases like .NET 9 expire before their previous LTS version support has ended.

Enterprise upgrades for apps in support mode are commonly done at the last minute as deadline pressures mount. The pressures and time complexities of an upgrade then weigh on teams working in growing or mature applications like this scenario. Staying on .NET 8, you can choose to wait for the last minute and skip to the newly released .NET 11 or stay on LTS and only upgrade to 10. The work to upgrade might be more, but it may be worth it. Even if your application moves into support mode or feature work is too demanding, the tax of upgrading is manageable. If you upgrade to .NET 9, when the deadline presents itself to upgrade, you have to move to .NET 10. You cannot skip a version or you risk being out of support. This makes the choice of moving off a LTS version onto an STS a commitment that this app will stay on the upgrade treadmill and pay the upgrade tax every year.

## Support change

The .NET team has recognized issues with the 18-month support window for STS releases and extended support going forward to 24 months. This takes effect with .NET 9, moving the end of support from May 2026 to November 2026. This means that support for STS releases will now end at the same time as the previous LTS release, aligning the end-of-support dates for both STS and LTS versions.

![New .NET support lifecycle for releases](/assets/_blog/dotnet-sts-24-month-support/release_lifecycle.jpg)

This change in support solves a lot of problems, including with our scenario above:

- LTS releases no longer outlive their following STS releases
- STS releases now end support at the same time as a new release

Given these changes, let's examine the impact on our upgrade tax scenario.

### 24-month STS scenario

We are going to rewrite history and assume we knew about this 24-month support. We have the choice to upgrade from an LTS version to STS with .NET 8 to .NET 9. Now, future considerations change. The year afterwards, we may have the bandwidth to stay on the upgrade treadmill and move to .NET 10. However, enterprise priorities shift and we choose not to. Both .NET 8 and .NET 9 apps are still supported until the following release. If we wait until the last minute, both end their support with the same options: upgrade to the LTS version (.NET 10) or skip ahead and move to .NET 11.

The change in the scenario is subtle, but significant. The choice to move from an LTS version to an STS version does not commit you to a different upgrade schedule than any apps unable to move to STS. Apps in support mode or transitioning to LTS can stay on LTS, but applications with active development can take advantages of STS releases. This means that the choice to move to an STS release is not a commitment to a different upgrade schedule, but rather an opportunity to take advantage of new features and improvements while still being able to upgrade to the next release when ready.

## .NET 10 is coming

We are very close to the launch of .NET 10, the next LTS release. The change in STS support won't impact this launch, yet it is the start of a new conversation around upgrading .NET applications. .NET 8 and .NET 9 applications will be upgrading to .NET 10 when ready and taking advantages of new features and performance improvements. What the STS support lifecycle really changes is what comes next: are you going to be stuck with .NET 10 for the next two years or will you be confident in your choice November 2026 to stay on .NET 10 or make the jump to .NET 11?

## Concluding remarks

The scenario I covered was a real one. The team had the bandwidth, the management support was there, and the product roadmap was healthy. However, no one was confident where they would be in 18 months and if we would be able to keep paying the upgrade tax. The schedule was too much of a commitment. The move to 24-month support changes the calculus. The hesitation to upgrade to .NET 9 would not have existed if we knew it wouldn't trap us into upgrading to .NET 10 a year later. Going forward, I will be able to safely recommend upgrading .NET each November regardless of if the release is STS or LTS.
