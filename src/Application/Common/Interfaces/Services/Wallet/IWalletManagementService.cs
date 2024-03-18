using Defender.Common.Clients.Wallet;
using Defender.Portal.Application.DTOs.Wallet;

namespace Defender.Portal.Application.Common.Interfaces.Services.Wallet;

public interface IWalletManagementService
{
    public Task<PortalWalletInfoDto> GetCurrentWalletInfoAsync();

    Task<PortalWalletInfoDto> CreateNewAccountAsync(
        Currency currency,
        bool isDefault = false);

}
