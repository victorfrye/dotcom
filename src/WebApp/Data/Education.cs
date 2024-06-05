using VictorFrye.DotCom.WebApp.Models;

using FluentIcons = Microsoft.FluentUI.AspNetCore.Components.Icons;

namespace VictorFrye.DotCom.WebApp.Data;

public static partial class CareerSummary
{
    internal static readonly Entity DavenportUniversity = new("Davenport University", "Grand Rapids, Michigan", "private, non-profit university", "https://davenport.edu");
    internal static readonly Entity CornerstoneUniversity = new("Cornerstone University", "Grand Rapids, Michigan", "private, non-profit university", "https://cornerstone.edu");

    public static readonly Experience StudyAtDavenportUniversity = new(
        "Bachelor of Science",
        new FluentIcons.Regular.Size24.HatGraduation(),
        DavenportUniversity,
        new(2016, 1, 3),
        new(2019, 12, 14),
        static builder =>
        {
            builder.OpenElement(0, "p");
            builder.AddContent(1, "Attended Davenport University's College of Technology full-time. Majored in computer science with focuses on software development, artificial intelligence, and mathematics. Graduated with a 3.77 GPA and three academic honor society inductions.");
            builder.CloseElement();
        });

    public static readonly Experience StudyAtCornerstoneUniversity = new(
        "Master of Business Administration",
        new FluentIcons.Regular.Size24.HatGraduation(),
        CornerstoneUniversity,
        new(2020, 6, 1),
        new(2022, 2, 14),
        static builder =>
        {
            builder.OpenElement(0, "p");
            builder.AddContent(1, "Attended Cornerstone University's Professional & Graduate Studies program full-time in accelerated format. Academic focus was on quantitative business administration with an emphasis project management. Graduated with a 3.84 GPA.");
            builder.CloseElement();
        });

    public static readonly IEnumerable<Experience> Education = [StudyAtDavenportUniversity, StudyAtCornerstoneUniversity];
}
