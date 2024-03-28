using Defender.Common.Clients.Wallet;
using Defender.Portal.Application.DTOs.Wallets;

namespace Defender.Portal.Infrastructure.Clients.Interfaces;

public interface IWalletWrapper
{
    Task<WalletDto> GetWalletInfoAsync();
    Task<WalletDto> CreateNewAccountAsync(
        Currency currency,
        bool isDefault);
    Task<PublicPortalWalletInfoDto> GetPublicWalletInfoByNumberAsync(
        int walletNumber);
    Task<PortalTransactionDto> StartTransferTransactionAsync(
        int walletNumber,
        int amount,
        Currency currency);
}
