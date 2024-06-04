namespace VictorFrye.DotCom.WebApp.Models;

public class Entity(string name, string location, string description, string url)
{
    public string Name { get; init; } = name;
    public string Location { get; init; } = location;
    public string Description { get; init; } = description;
    public string Url { get; init; } = url;
}
