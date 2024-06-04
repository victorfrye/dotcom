using Microsoft.AspNetCore.Components;

namespace VictorFrye.DotCom.WebApp.Models;

public class Social(string name, RenderFragment icon, string userHref)
{
    public string Name { get; init; } = name;
    public RenderFragment Icon { get; init; } = icon;
    public string UserHref { get; init; } = userHref;
}
