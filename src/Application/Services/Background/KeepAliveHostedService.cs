using Defender.Common.Clients.Identity;
using Defender.Common.Clients.UserManagement;
using Defender.Common.Clients.Wallet;
using Microsoft.Extensions.Hosting;

namespace Defender.Portal.Application.Services.Background;

public class KeepAliveHostedService(
        IIdentityServiceClient identityServiceClient,
        IWalletServiceClient walletServiceClient,
        IUserManagementServiceClient userManagementServiceClient)
    : IHostedService, IDisposable
{
    private Timer? _timer;

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _timer = new Timer(PingServers, null, TimeSpan.Zero, TimeSpan.FromMinutes(2));

        return Task.CompletedTask;
    }

    private void PingServers(object? state)
    {
        identityServiceClient.HealthAsync();
        walletServiceClient.HealthAsync();
        userManagementServiceClient.HealthAsync();
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _timer?.Change(Timeout.Infinite, 0);

        return Task.CompletedTask;
    }

    public void Dispose()
    {
        _timer?.Dispose();
    }
}
