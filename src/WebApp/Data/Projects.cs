using FluentIcons = Microsoft.FluentUI.AspNetCore.Components.Icons;


using VictorFrye.DotCom.WebApp.Models;
using Microsoft.FluentUI.AspNetCore.Components;

namespace VictorFrye.DotCom.WebApp.Data;

public static class Projects
{
    internal static readonly Project Dotfiles = new(
        name: "Dotfiles",
        icon: new Emojis.Objects.HighContrast.Default.Gear(),
        skills: [Skills.PowerShell, Skills.Windows, Skills.Git],
        content: "My personal dotfiles to initialize Windows machine configuration, primarily utilizing WinGet.",
        url: "https://github.com/victorfrye/dotfiles"
    );

    internal static readonly Project DotCom = new(
        name: "VictorFrye.COM",
        icon: new Emojis.TravelPlaces.HighContrast.Default.GlobeWithMeridians(),
        skills: [Skills.CSharp, Skills.DotNet, Skills.Azure, Skills.GitHub],
        content: "This website! Built with .NET Blazor and hosted on Azure, this serves as my personal resume and portfolio.",
        url: "https://victorfrye.com"
    );

    internal static readonly Project MicrosoftGraveyard = new(
        name: "Microsoft Graveyard",
        icon: new Emojis.Objects.HighContrast.Default.Headstone(),
        skills: [Skills.CSharp, Skills.DotNet, Skills.Azure, Skills.GitHub],
        content: "A virtual collection of Microsoft technologies that have been deprecated, discontinued, or otherwise abandoned. Inspired by Killed By Google.",
        url: "https://microsoftgraveyard.com"
    );

    internal static readonly Project MockingMirror = new(
        name: "Mocking Mirror",
        icon: new Emojis.SmileysEmotion.HighContrast.Default.ClownFace(),
        skills: [Skills.JavaScript, Skills.DotNet, Skills.Azure, Skills.GitHub],
        content: "An artificial intelligence prototype to capture and comment on a user's appearance using image recognition, speech synthesis, and generative AI.",
        url: "https://mockingmirror.com"
    );

    public static readonly IEnumerable<Project> All = [Dotfiles, DotCom, MicrosoftGraveyard, MockingMirror];
}
