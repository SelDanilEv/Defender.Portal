using Defender.Common.Clients.Wallet;

namespace Defender.Portal.Infrastructure.Clients.Interfaces;

public interface IWalletWrapper
{
    Task<WalletDto> GetWalletInfoAsync();
    Task<WalletDto> CreateNewAccountAsync(
        Currency currency,
        bool isDefault);
}
