using Defender.Portal.Application.Common.Interfaces.Services.Admin;
using Defender.Portal.Application.DTOs.Banking;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Services.Admin;

public class AdminWalletManagementService(
        IWalletWrapper walletWrapper
    ) : IAdminWalletManagementService
{
    public async Task<PortalWalletInfoDto> GetWalletInfoByNumberAsync(
        int walletNumber)
    {
        var walletInfo = await walletWrapper
            .GetWalletInfoByNumberAsync(walletNumber);

        return walletInfo;
    }

    public async Task<PortalWalletInfoDto> GetUserWalletInfoAsync(Guid userId)
    {
        var wallet = await walletWrapper.GetWalletInfoAsync(userId);

        return wallet;
    }
}
