using System.Reflection;
using Defender.Common.Clients.Identity;
using Defender.Common.Clients.UserManagement;
using Defender.Common.Clients.Wallet;
using Defender.Portal.Application.Common.Interfaces.Repositories;
using Defender.Portal.Application.Common.Interfaces.Services;
using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using Defender.Portal.Application.Common.Interfaces.Services.Admin;
using Defender.Portal.Application.Common.Interfaces.Services.Banking;
using Defender.Portal.Application.Configuration.Options;
using Defender.Portal.Infrastructure.Clients.Identity;
using Defender.Portal.Infrastructure.Clients.Interfaces;
using Defender.Portal.Infrastructure.Clients.UserManagement;
using Defender.Portal.Infrastructure.Clients.Wallet;
using Defender.Portal.Infrastructure.Repositories.Sample;
using Defender.Portal.Infrastructure.Services;
using Defender.Portal.Infrastructure.Services.Accounts;
using Defender.Portal.Infrastructure.Services.Admin;
using Defender.Portal.Infrastructure.Services.Background;
using Defender.Portal.Infrastructure.Services.Banking;
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
        services.AddTransient<IWalletWrapper, WalletWrapper>();

        services.AddHostedService<KeepAliveHostedService>();

        return services;
    }

    private static IServiceCollection RegisterServices(this IServiceCollection services)
    {
        services.AddTransient<IUserActivityService, UserActivityService>();
        services.AddTransient<IAuthorizationService, AuthorizationService>();
        services.AddTransient<IAccountManagementService, AccountManagementService>();
        services.AddTransient<IAccessCodeService, AccessCodeService>();

        services.AddTransient<IWalletManagementService, WalletManagementService>();
        services.AddTransient<ITransactionService, TransactionService>();

        services.AddTransient<IAdminWalletManagementService, AdminWalletManagementService>();
        services.AddTransient<IAdminTransactionManagementService, AdminTransactionManagementService>();
        services.AddTransient<IAdminAccountManagementService, AdminAccountManagementService>();

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

        services.RegisterWalletClient(
            (serviceProvider, client) =>
            {
                client.BaseAddress = new Uri(serviceProvider.GetRequiredService<IOptions<WalletOptions>>().Value.Url);
            });

        return services;
    }

}
