using Microsoft.FluentUI.AspNetCore.Components;

using FluentIcons = Microsoft.FluentUI.AspNetCore.Components.Icons;

namespace VictorFrye.DotCom.App.Models;

public class Certification(string name, string issuer, DateOnly issueDate, DateOnly? expirationDate = null, string? url = null)
{
    public string Name { get; init; } = name;
    public Icon Icon { get; init; } = new FluentIcons.Regular.Size24.Certificate();
    public string Issuer { get; init; } = issuer;
    public DateOnly IssueDate { get; init; } = issueDate;
    public DateOnly? ExpirationDate { get; init; } = expirationDate;
    public string? Url { get; init; } = url;

    public bool IsActive() => ExpirationDate is null || ExpirationDate.Value >= DateOnly.FromDateTime(DateTime.Now);

    public string GetStatus() => IsActive() ? $"Issued {IssueDate:MMMM yyyy}" : $"Expired {ExpirationDate:MMMM yyyy}";
}
