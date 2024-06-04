using System.Runtime.ConstrainedExecution;

using VictorFrye.DotCom.WebApp.Models;

namespace VictorFrye.DotCom.WebApp.Data;

public static class History
{
    // COMPANIES
    internal static readonly Entity CorewellHealth = new("Corewell Health", "Grand Rapids, Michigan", "regional healthcare provider", "https://corewellhealth.org");
    internal static readonly Entity LeadingEdje = new("Leading EDJE", "Columbus, Ohio", "software development consultancy", "https://leadingedje.com");

    // SCHOOLS
    internal static readonly Entity DavenportUniversity = new("Davenport University", "Grand Rapids, Michigan", "private, non-profit university", "https://davenport.edu");
    internal static readonly Entity CornerstoneUniversity = new("Cornerstone University", "Grand Rapids, Michigan", "private, non-profit university", "https://cornerstone.edu");

    // JOBS
    public static readonly Experience JobAtCorewellHealth = new("Software Engineer", CorewellHealth, new(2019, 5, 6), new(2023, 2, 17), builder =>
    {
        builder.OpenElement(0, "p");
        builder.AddContent(1, "Developed and supported continued operations of over 300 internal APIs and digital services to improve patient care and reduce member costs. Key achievements included the launch of a targeted marketing campaign service to push millions of personalized messages monthly and migration of legacy document service to a cloud-based solution for over 50% cost reduction.");
        builder.CloseElement();
    });

    public static readonly Experience JobAtLeadingEdje = new("Software Engineer", LeadingEdje, new(2023, 2, 20), content: builder =>
    {
        builder.OpenElement(0, "p");
        builder.AddContent(1, "Developing and architecting client solutions for a multitude of partners across industries. Key achievements include re-platforming a high-traffic lead generation widget for zero-downtime deployments and launching a mobile-native application healthcare application.");
        builder.CloseElement();
    });

    // EDUCATION
    public static readonly Experience StudyAtDavenportUniversity = new("Bachelor of Science", DavenportUniversity, new(2016, 1, 3), new(2019, 12, 14), builder =>
    {
        builder.OpenElement(0, "p");
        builder.AddContent(1, "Attended Davenport University's College of Technology full-time. Majored in computer science with focuses on software development, artificial intelligence, and mathematics. Graduated with a 3.77 GPA and three academic honor society inductions.");
        builder.CloseElement();
    });

    public static readonly Experience StudyAtCornerstoneUniversity = new("Master of Business Administration", CornerstoneUniversity, new(2020, 6, 1), new(2022, 2, 14), builder =>
    {
        builder.OpenElement(0, "p");
        builder.AddContent(1, "Attended Cornerstone University's Professional & Graduate Studies program full-time in accelerated format. Academic focus was on quantitative business administration with an emphasis project management. Graduated with a 3.84 GPA.");
        builder.CloseElement();
    });

    // EXPERIENCES
    public static readonly HashSet<Experience> Employment = [JobAtCorewellHealth, JobAtLeadingEdje];

    public static readonly HashSet<Experience> Education = [StudyAtDavenportUniversity, StudyAtCornerstoneUniversity];

    // CERTIFICATIONS
    public static readonly HashSet<Certification> Certifications =
    [
        new Certification("Microsoft Certified: Azure Fundamentals", "Microsoft", new(2023, 12, 21), url: "https://learn.microsoft.com/en-us/users/victorfrye/credentials/fab0ead497381392"),
        new Certification("Microsoft Certified: Azure AI Fundamentals", "Microsoft", new(2024, 4, 30), url: "https://learn.microsoft.com/en-us/users/victorfrye/credentials/af866c0af923042d"),
    ];
}
