var builder = DistributedApplication.CreateBuilder(args);

builder.AddNpmApp("client", "../WebClient", "dev")
    .WithHttpEndpoint(env: "PORT")
    .WithUrlForEndpoint("http", static _ => new()
    {
        Url = "/resume",
        DisplayText = "Resume"
    })
    .WithUrlForEndpoint("http", static _ => new()
    {
        Url = "/blog",
        DisplayText = "Blog"
    })
    .WithExternalHttpEndpoints()
    .WithHttpHealthCheck("/");

await builder.Build().RunAsync();
