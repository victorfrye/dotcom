using VictorFrye.DotCom.WebApp.Models;

namespace VictorFrye.DotCom.WebApp.Data;

public static partial class CareerSummary
{
    // CERTIFICATIONS
    public static readonly IEnumerable<Certification> Certifications =
    [
        new Certification("Microsoft Certified: Azure Fundamentals", "Microsoft", new(2023, 12, 21), url: "https://learn.microsoft.com/en-us/users/victorfrye/credentials/fab0ead497381392"),
        new Certification("Microsoft Certified: Azure AI Fundamentals", "Microsoft", new(2024, 4, 30), url: "https://learn.microsoft.com/en-us/users/victorfrye/credentials/af866c0af923042d"),
    ];
}
