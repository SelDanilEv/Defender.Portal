using Defender.Common.Clients.Wallet;
using Defender.Portal.Application.DTOs.Wallets;

namespace Defender.Portal.Application.Common.Interfaces.Services.Wallets;

public interface IWalletManagementService
{
    public Task<PortalWalletInfoDto> GetCurrentWalletInfoAsync();

    Task<PortalWalletInfoDto> CreateNewAccountAsync(
        Currency currency,
        bool isDefault = false);

    Task<PublicPortalWalletInfoDto> GetPublicWalletInfoAsync(
        int walletNumber);

}
