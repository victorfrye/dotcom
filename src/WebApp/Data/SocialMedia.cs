using FluentIcons = Microsoft.FluentUI.AspNetCore.Components.Icons;


using VictorFrye.DotCom.WebApp.Models;

namespace VictorFrye.DotCom.WebApp.Data;

public static class SocialMedia
{
    public static readonly Social Threads = new(
        name: "Threads",
        icon: new Icons.Threads(),
        userHref: "https://threads.net/@thevictorfryeadventure"
        );

    public static readonly Social GitHub = new(
        name: "GitHub",
        icon: new Icons.GitHub(),
        userHref: "https://github.com/victorfrye"
        );

    public static readonly Social LinkedIn = new(
        name: "LinkedIn",
        icon: new Icons.LinkedIn(),

        userHref: "https://linkedin.com/in/victorfrye"
        );

    public static readonly Social Email = new(
        name: "Email",
        icon: new FluentIcons.Filled.Size28.Mail(),
        userHref: "mailto:victorfrye@outlook.com"
        );

    public static readonly HashSet<Social> All = [Threads, LinkedIn, GitHub, Email];

}
