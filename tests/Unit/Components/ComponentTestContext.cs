using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Time.Testing;
using Microsoft.FluentUI.AspNetCore.Components;

namespace VictorFrye.DotCom.Tests.Unit.Components;

public class ComponentTestContext : TestContext
{
    [Inject]
    protected GlobalState GlobalState { get; set; } = new GlobalState();

    [Inject]
    protected TimeProvider TimeProvider { get; set; } = new FakeTimeProvider();

    protected void AddGlobalState()
    {
        Services.AddSingleton(GlobalState);
    }

    protected void AddTimeProvider()
    {
        Services.AddSingleton(TimeProvider);
    }

    protected void SetupLooseJSInterop()
    {
        JSInterop.Mode = JSRuntimeMode.Loose;
    }
}
