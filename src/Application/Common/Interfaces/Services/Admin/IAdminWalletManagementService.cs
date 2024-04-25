using Defender.Portal.Application.DTOs.Banking;

namespace Defender.Portal.Application.Common.Interfaces.Services.Admin;

public interface IAdminWalletManagementService
{
    Task<PortalWalletInfoDto> GetWalletInfoByNumberAsync(
        int walletNumber);

    Task<PortalWalletInfoDto> GetUserWalletInfoAsync(Guid userId);
}
