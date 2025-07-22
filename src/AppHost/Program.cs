using VictorFrye.DotCom.AppHost;

var builder = DistributedApplication.CreateBuilder(args);

builder.AddNpmApp("client", "../WebClient", "dev")
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .WithChildUrl("blog")
    .WithChildUrl("resume");

await builder.Build().RunAsync();
