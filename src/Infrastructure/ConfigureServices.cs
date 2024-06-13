using System.Reflection;
using Defender.Common.Clients.Identity;
using Defender.Common.Clients.RiskGames;
using Defender.Common.Clients.UserManagement;
using Defender.Common.Clients.Wallet;
using Defender.Portal.Application.Common.Interfaces.Repositories;
using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.Configuration.Options;
using Defender.Portal.Application.Services.Background;
using Defender.Portal.Infrastructure.Clients.Identity;
using Defender.Portal.Infrastructure.Clients.UserManagement;
using Defender.Portal.Infrastructure.Clients.Wallet;
using Defender.Portal.Infrastructure.Repositories.Sample;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Defender.Portal.Infrastructure;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        services
            .RegisterRepositories()
            .RegisterApiClients()
            .RegisterClientWrappers();

        return services;
    }

    private static IServiceCollection RegisterClientWrappers(this IServiceCollection services)
    {
        services.AddTransient<IIdentityWrapper, IdentityWrapper>();
        services.AddTransient<IUserManagementWrapper, UserManagementWrapper>();
        services.AddTransient<IWalletWrapper, WalletWrapper>();
        services.AddTransient<IRiskGamesWrapper, RiskGamesWrapper>();

        services.AddHostedService<KeepAliveHostedService>();

        return services;
    }

    private static IServiceCollection RegisterRepositories(this IServiceCollection services)
    {
        services.AddSingleton<IUserActivityRepository, UserActivityRepository>();

        return services;
    }

    private static IServiceCollection RegisterApiClients(
        this IServiceCollection services)
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

        services.RegisterWalletClient(
            (serviceProvider, client) =>
            {
                client.BaseAddress = new Uri(serviceProvider.GetRequiredService<IOptions<WalletOptions>>().Value.Url);
            });

        services.RegisterRiskGamesClient(
            (serviceProvider, client) =>
            {
                client.BaseAddress = new Uri(serviceProvider.GetRequiredService<IOptions<RiskGamesOptions>>().Value.Url);
            });

        return services;
    }

}
