using System.ComponentModel;

namespace VictorFrye.DotCom.App.Models.Extensions;

public static class SkillsExtensions
{
    public static string ToLabel(this Skills skill)
    {
        var toString = skill.ToString();

        var field = skill.GetType().GetField(toString);

        if (field is null)
        {
            return string.Empty;
        }

        var attribute = Attribute.GetCustomAttribute(field, typeof(DescriptionAttribute)) as DescriptionAttribute;
        return attribute is not null ? attribute.Description : toString;
    }
}
