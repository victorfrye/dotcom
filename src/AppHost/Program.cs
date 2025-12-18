var builder = DistributedApplication.CreateBuilder(args);

builder.AddJavaScriptApp("client", "../WebClient", "dev")
       .WithIconName("Globe")
       .WithNpm(install: true)
       .WithHttpEndpoint(env: "PORT")
       .WithUrlForEndpoint("http", static url => url.DisplayText = "🏠 Home")
       .WithUrlForEndpoint("http", static _ => new()
       {
           Url = "/resume",
           DisplayText = "💼 Resume"
       })
       .WithUrlForEndpoint("http", static _ => new()
       {
           Url = "/blog",
           DisplayText = "✏️ Blog"
       })
       .WithExternalHttpEndpoints()
       .WithHttpHealthCheck("/");

await builder.Build().RunAsync();
