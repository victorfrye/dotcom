using System.ComponentModel;

namespace VictorFrye.DotCom.WebApp.Models;

public enum Skills
{
    [Description("HTML")]
    Html,

    [Description("CSS")]
    Css,

    [Description("C#")]
    CSharp,

    [Description("JavaScript")]
    JavaScript,

    [Description("TypeScript")]
    TypeScript,

    [Description("PowerShell")]
    PowerShell,

    [Description("SQL")]
    Sql,

    [Description(".NET")]
    DotNet,

    [Description("React")]
    React,

    [Description("Git")]
    Git,

    [Description("Docker")]
    Docker,

    [Description("Terraform")]
    Terraform,

    [Description("Azure")]
    Azure,

    [Description("GitHub")]
    GitHub,

    [Description("Windows")]
    Windows
}
