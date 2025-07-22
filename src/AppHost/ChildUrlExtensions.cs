using System.Collections.Immutable;
using System.Diagnostics;

using Aspire.Hosting.Lifecycle;

namespace VictorFrye.DotCom.AppHost;

public static class ChildUrlExtensions
{
    public static IResourceBuilder<TResource> WithChildUrl<TResource>(this IResourceBuilder<TResource> builder, [ResourceName] string name, string? relativeUrl = null)
        where TResource : IResource, IResourceWithEndpoints
    {
        ArgumentNullException.ThrowIfNull(builder);
        ArgumentException.ThrowIfNullOrWhiteSpace(name);

        relativeUrl ??= $"/{name.ToLowerInvariant()}";

        var urlResource = new ChildUrlResource<TResource>(name, relativeUrl, builder.Resource);

        builder.Resource.TryGetEndpoints(out var endpoints);

        if (endpoints is null || !endpoints.Any())
        {
            throw new InvalidOperationException($"Resource '{builder.Resource.Name}' does not have any endpoints defined. Cannot create child URL '{name}' with relative URL '{relativeUrl}'.");
        }

        var endpointReferences = endpoints.Select(ep => builder.GetEndpoint(ep.Name));

        builder.ApplicationBuilder.Services.TryAddLifecycleHook<ChildUrlHook<TResource>>();
        builder.ApplicationBuilder.AddResource(urlResource)
            .WithUrls(c =>
            {
                var parent = (c.Resource as ChildUrlResource<TResource>)!.Parent;

                parent.TryGetEndpoints(out var endpoints);

                if (endpoints is null || !endpoints.Any())
                {
                    return;
                }

                var urls = endpoints.Select(endpoint => new UrlSnapshot(endpoint.Name, $"{endpoint.AllocatedEndpoint?.UriString}{childUrl.RelativeUrl}", IsInternal: false))
                                    .ToImmutableArray();

                c.Urls.AddRange(urls);
            })
            .WithInitialState(new CustomResourceSnapshot
            {
                ResourceType = "ChildUrl",
                Properties = [],
                StartTimeStamp = new DateTime(Stopwatch.GetTimestamp()),
                State = KnownResourceStates.Starting
            })
            .ExcludeFromManifest();

        return builder;
    }
}

class ChildUrlHook<TResource>(ResourceNotificationService notificationService) : IDistributedApplicationLifecycleHook
    where TResource : IResource
{
    public async Task AfterEndpointsAllocatedAsync(DistributedApplicationModel appModel, CancellationToken cancellationToken = default)
    {
        var childUrls = appModel.Resources.OfType<ChildUrlResource<TResource>>();

        if (!childUrls.Any())
        {
            return;
        }

        IEnumerable<Task> tasks = [];

        foreach (var childUrl in childUrls)
        {
            childUrl.Parent.TryGetEndpoints(out var endpoints);

            if (endpoints is null || !endpoints.Any())
            {
                continue;
            }

            var urls = endpoints.Select(endpoint => new UrlSnapshot(endpoint.Name, $"{endpoint.AllocatedEndpoint?.UriString}{childUrl.RelativeUrl}", IsInternal: false))
                                .ToImmutableArray();

            tasks = [(notificationService.PublishUpdateAsync(childUrl, s => s with
            {
                State = KnownResourceStates.Running,
                Urls = urls
            })), ..tasks];
        }

        await Task.WhenAll(tasks);
    }
}

class ChildUrlResource<TResource>(string name, string relativeUrl, TResource parent) : Resource(name), IResourceWithParent<TResource>, IResourceWithEndpoints
    where TResource : IResource
{
    public TResource Parent { get; } = parent ?? throw new ArgumentNullException(nameof(parent));

    public string RelativeUrl { get; } = relativeUrl ?? throw new ArgumentNullException(nameof(relativeUrl));
}

class ChildUrlAnnotation(string relativeUrl, IEnumerable<EndpointReference> endpointReferences) : IResourceAnnotation
{
    public string RelativeUrl { get; } = relativeUrl ?? throw new ArgumentNullException(nameof(relativeUrl));
    public IEnumerable<EndpointReference> EndpointReferences { get; } = endpointReferences ?? throw new ArgumentNullException(nameof(endpointReferences));
}
