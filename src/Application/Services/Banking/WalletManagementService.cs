using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using Defender.Portal.Application.Common.Interfaces.Services.Banking;
using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.Banking;
using Defender.Portal.Application.Enums;

namespace Defender.Portal.Application.Services.Banking;

public class WalletManagementService(
        IWalletWrapper walletWrapper,
        IAccountManagementService accountManagementService
    ) : IWalletManagementService
{
    public async Task<PortalWalletInfoDto> GetCurrentWalletInfoAsync()
    {
        var wallet = await walletWrapper.GetWalletInfoAsync();

        return wallet;
    }

    public async Task<PortalWalletInfoDto> CreateNewAccountAsync(
        Currency currency,
        bool isDefault = false)
    {
        var wallet = await walletWrapper
            .CreateNewAccountAsync(currency, isDefault);

        return wallet;
    }

    public async Task<PublicPortalWalletInfoDto> GetPublicWalletInfoByNumberAsync(
        int walletNumber)
    {
        var publicWalletInfo = await walletWrapper
            .GetPublicWalletInfoByNumberAsync(walletNumber);

        var userInfo = await accountManagementService
            .GetPublicUserInfoAsync(publicWalletInfo.OwnerId);

        publicWalletInfo.OwnerName = userInfo?.Nickname;

        return publicWalletInfo;
    }
}
