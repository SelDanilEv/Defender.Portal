using System.Net.Http.Headers;
using System.Reflection;
using Defender.Common.Clients.Identity;
using Defender.Common.Helpers;
using Defender.Portal.Application.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces.Repositories;
using Defender.Portal.Application.Configuration.Options;
using Defender.Portal.Infrastructure.Clients.Identity;
using Defender.Portal.Infrastructure.Clients.Interfaces;
using Defender.Portal.Infrastructure.Repositories.Sample;
using Defender.Portal.Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Defender.Portal.Infrastructure;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        services.RegisterServices();

        services.RegisterRepositories();

        services.RegisterApiClients(configuration);

        RegisterClientWrappers(services);

        return services;
    }

    private static void RegisterClientWrappers(IServiceCollection services)
    {
        services.AddTransient<IIdentityWrapper, IdentityWrapper>();
    }

    private static IServiceCollection RegisterServices(this IServiceCollection services)
    {
        services.AddTransient<IUserActivityService, UserActivityService>();
        services.AddTransient<IAuthorizationService, AuthorizationService>();

        return services;
    }

    private static IServiceCollection RegisterRepositories(this IServiceCollection services)
    {
        services.AddTransient<IUserActivityRepository, UserActivityRepository>();

        return services;
    }

    private static IServiceCollection RegisterApiClients(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.RegisterIdentityAsServiceClient(
            (serviceProvider, client) =>
            {
                client.BaseAddress = new Uri(serviceProvider.GetRequiredService<IOptions<IdentityOptions>>().Value.Url);
                client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue(
                    "Bearer",
                    InternalJwtHelper.GenerateInternalJWT(configuration["JwtTokenIssuer"]));
            });

        return services;
    }

}
