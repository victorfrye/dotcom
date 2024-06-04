namespace VictorFrye.DotCom.WebApp.Models;

public class Certification(string name, string issuer, DateOnly issueDate, DateOnly? expirationDate = null, string? url = null)
{
    public string Name { get; init; } = name;
    public string Issuer { get; init; } = issuer;
    public DateOnly IssueDate { get; init; } = issueDate;
    public DateOnly? ExpirationDate { get; init; } = expirationDate;
    public string? Url { get; init; } = url;
}
