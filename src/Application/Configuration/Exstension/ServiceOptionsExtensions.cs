using Defender.Common.Exstension;
using Defender.Portal.Application.Configuration.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Defender.Portal.Application.Configuration.Exstension;

public static class ServiceOptionsExtensions
{
    public static IServiceCollection AddApplicationOptions(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<IdentityOptions>(configuration.GetSection(nameof(IdentityOptions)));

        return services;
    }
}