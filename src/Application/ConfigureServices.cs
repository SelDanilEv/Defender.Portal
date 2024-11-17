using System.Reflection;
using Defender.Portal.Application.Common.Interfaces.Services;
using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using Defender.Portal.Application.Common.Interfaces.Services.Admin;
using Defender.Portal.Application.Common.Interfaces.Services.Banking;
using Defender.Portal.Application.Common.Interfaces.Services.RiskGames.Lottery;
using Defender.Portal.Application.Services.Accounts;
using Defender.Portal.Application.Services.Admin;
using Defender.Portal.Application.Services.Banking;
using Defender.Portal.Application.Services.RiskGames.Lottery;
using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Defender.Portal.Application;

public static class ConfigureServices
{
    public static IServiceCollection AddApplicationServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

        services.RegisterServices();

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

        services.AddTransient<ILotteryService, LotteryService>();

        services.AddTransient<IAdminWalletManagementService, AdminWalletManagementService>();
        services.AddTransient<IAdminTransactionManagementService, AdminTransactionManagementService>();
        services.AddTransient<IAdminAccountManagementService, AdminAccountManagementService>();

        return services;
    }
}
