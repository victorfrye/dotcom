using Microsoft.AspNetCore.Components;

namespace VictorFrye.DotCom.WebApp.Models;

public class Experience(string title, Entity entity, DateOnly startDate, DateOnly? endDate = null, RenderFragment? content = null)
{
    public string Title { get; init; } = title;
    public Entity Entity { get; init; } = entity;
    public DateOnly StartDate { get; init; } = startDate;
    public DateOnly? EndDate { get; init; } = endDate;
    public RenderFragment? Content { get; init; } = content;
}
