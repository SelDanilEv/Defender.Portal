using Defender.Common.Clients.Wallet;
using Defender.Common.DB.Pagination;
using Defender.Portal.Application.DTOs.Banking;
using Currency = Defender.Portal.Application.Enums.Currency;

namespace Defender.Portal.Infrastructure.Clients.Interfaces;

public interface IWalletWrapper
{
    Task<PortalWalletInfoDto> GetWalletInfoAsync(Guid? userId = null);

    Task<PortalWalletInfoDto> CreateNewAccountAsync(
        Currency currency,
        bool isDefault);

    Task<PublicPortalWalletInfoDto> GetPublicWalletInfoByNumberAsync(
        int walletNumber);

    Task<PortalWalletInfoDto> GetWalletInfoByNumberAsync(
        int walletNumber);

    Task<PortalTransactionDto> StartTransferTransactionAsync(
        int walletNumber,
        int amount,
        Currency currency);

    Task<PortalTransactionDto> StartRechargeTransactionAsync(
        int walletNumber,
        int amount,
        Currency currency);

    Task<TransactionDtoPagedResult> GetTransactionHistoryAsync(
        PaginationRequest paginationRequest,
        Guid? walletId = null);
}
