namespace VictorFrye.DotCom.WebApp.Models;

public record Entity(string Name, string Location, string Description, string Url)
{
    public string Name { get; init; } = Name;
    public string Location { get; init; } = Location;
    public string Description { get; init; } = Description;
    public string Url { get; init; } = Url;
}
