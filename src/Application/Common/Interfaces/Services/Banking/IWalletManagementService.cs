using Defender.Portal.Application.DTOs.Banking;
using Defender.Portal.Application.Enums;

namespace Defender.Portal.Application.Common.Interfaces.Services.Banking;

public interface IWalletManagementService
{
    Task<PortalWalletInfoDto> GetCurrentWalletInfoAsync();

    Task<PortalWalletInfoDto> CreateNewAccountAsync(
        Currency currency,
        bool isDefault = false);

    Task<PublicPortalWalletInfoDto> GetPublicWalletInfoByNumberAsync(
        int walletNumber);

}
