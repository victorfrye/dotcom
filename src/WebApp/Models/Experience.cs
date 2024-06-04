using Microsoft.AspNetCore.Components;
using Microsoft.FluentUI.AspNetCore.Components;

namespace VictorFrye.DotCom.WebApp.Models;

public class Experience(string title, Icon icon, Entity entity, DateOnly startDate, DateOnly? endDate = null, RenderFragment? content = null)
{
    public string Title { get; init; } = title;
    public Icon Icon { get; init; } = icon;
    public Entity Entity { get; init; } = entity;
    public DateOnly StartDate { get; init; } = startDate;
    public DateOnly? EndDate { get; init; } = endDate;
    public RenderFragment? Content { get; init; } = content;

    public string GetDuration() => EndDate is null ? $"{StartDate:MMMM yyyy} - Present" : $"{StartDate:MMMM yyyy} - {EndDate:MMMM yyyy}";
}
