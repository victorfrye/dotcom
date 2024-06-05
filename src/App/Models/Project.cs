using Microsoft.FluentUI.AspNetCore.Components;

using VictorFrye.DotCom.App.Models.Extensions;

namespace VictorFrye.DotCom.App.Models;

public class Project(string name, Emoji icon, IEnumerable<Skills> skills, string content, string? url = null)
{
    public string Name { get; init; } = name;
    public Emoji Icon { get; init; } = icon;
    public IEnumerable<Skills> Skills { get; init; } = skills ?? [];
    public string Content { get; init; } = content;
    public string? Url { get; init; } = url;

    public IEnumerable<string> GetSkillLabels() => Skills.Select(s => s.ToLabel());
}
