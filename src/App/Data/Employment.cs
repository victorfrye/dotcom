using VictorFrye.DotCom.App.Models;

using FluentIcons = Microsoft.FluentUI.AspNetCore.Components.Icons;

namespace VictorFrye.DotCom.App.Data;

public static partial class CareerSummary
{
    internal static readonly Entity CorewellHealth = new("Corewell Health", "Grand Rapids, Michigan", "regional healthcare provider", "https://corewellhealth.org");
    internal static readonly Entity LeadingEdje = new("Leading EDJE", "Columbus, Ohio", "software development consultancy", "https://leadingedje.com");

    public static readonly Experience JobAtCorewellHealth = new(
        "Software Engineer",
        new FluentIcons.Regular.Size24.Building(),
        CorewellHealth,
        new(2019, 5, 6),
        new(2023, 2, 17),
        static builder =>
        {
            builder.OpenElement(0, "p");
            builder.AddContent(1, "Developed and supported continued operations of over 300 internal APIs and digital services to improve patient care and reduce member costs. Key achievements included the launch of a targeted marketing campaign service to push millions of personalized messages monthly and migration of legacy document service to a cloud-based solution for over 50% cost reduction.");
            builder.CloseElement();
        });

    public static readonly Experience JobAtLeadingEdje = new(
        "Senior Software Engineer",
        new FluentIcons.Regular.Size24.Building(),
        LeadingEdje,
        new(2023, 2, 20),
        content: static builder =>
        {
            builder.OpenElement(0, "p");
            builder.AddContent(1, "Developing and architecting client solutions for a multitude of partners across industries. Key achievements include re-platforming a high-traffic lead generation widget for zero-downtime deployments and launching a mobile-native application healthcare application.");
            builder.CloseElement();
        });

    public static readonly IEnumerable<Experience> Employment = [JobAtCorewellHealth, JobAtLeadingEdje];
}
