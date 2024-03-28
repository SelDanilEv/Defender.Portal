using AutoMapper;
using Defender.Common.Clients.Wallet;
using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using Defender.Portal.Application.Common.Interfaces.Services.Wallets;
using Defender.Portal.Application.DTOs.Wallets;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Services.Wallet;

public class WalletManagementService(
        IWalletWrapper walletWrapper,
        IAccountManagementService accountManagementService,
        IMapper mapper
    ) : IWalletManagementService
{
    public async Task<PortalWalletInfoDto> GetCurrentWalletInfoAsync()
    {
        var wallet = await walletWrapper.GetWalletInfoAsync();

        return mapper.Map<PortalWalletInfoDto>(wallet);
    }

    public async Task<PortalWalletInfoDto> CreateNewAccountAsync(
        Currency currency,
        bool isDefault = false)
    {
        var wallet = await walletWrapper
            .CreateNewAccountAsync(currency, isDefault);

        return mapper.Map<PortalWalletInfoDto>(wallet);
    }

    public async Task<PublicPortalWalletInfoDto> GetPublicWalletInfoAsync(
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
