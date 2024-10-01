using Defender.Portal.Application.Configuration.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Defender.Portal.Application.Configuration.Exstension;

public static class ServiceOptionsExtensions
{
    public static IServiceCollection AddApplicationOptions(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<IdentityOptions>(configuration.GetSection(nameof(IdentityOptions)));
        services.Configure<UserManagementOptions>(configuration.GetSection(nameof(UserManagementOptions)));
        services.Configure<WalletOptions>(configuration.GetSection(nameof(WalletOptions)));
        services.Configure<RiskGamesOptions>(configuration.GetSection(nameof(RiskGamesOptions)));
        services.Configure<BudgetTrackerOptions>(configuration.GetSection(nameof(BudgetTrackerOptions)));

        return services;
    }
}