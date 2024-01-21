using System.Reflection;
using Defender.Common.Clients.Identity;
using Defender.Common.Clients.UserManagement;
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

        services
            .RegisterServices()
            .RegisterRepositories()
            .RegisterApiClients(configuration)
            .RegisterClientWrappers();

        return services;
    }

    private static IServiceCollection RegisterClientWrappers(this IServiceCollection services)
    {
        services.AddTransient<IIdentityWrapper, IdentityWrapper>();
        services.AddTransient<IUserManagementWrapper, UserManagementWrapper>();

        return services;
    }

    private static IServiceCollection RegisterServices(this IServiceCollection services)
    {
        services.AddTransient<IUserActivityService, UserActivityService>();
        services.AddTransient<IAuthorizationService, AuthorizationService>();
        services.AddTransient<IAccountManagementService, AccountManagementService>();
        services.AddTransient<IAccessCodeService, AccessCodeService>();

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
        services.RegisterIdentityClient(
            (serviceProvider, client) =>
            {
                client.BaseAddress = new Uri(serviceProvider.GetRequiredService<IOptions<IdentityOptions>>().Value.Url);
            });

        services.RegisterUserManagementClient(
            (serviceProvider, client) =>
            {
                client.BaseAddress = new Uri(serviceProvider.GetRequiredService<IOptions<UserManagementOptions>>().Value.Url);
            });

        return services;
    }

}
