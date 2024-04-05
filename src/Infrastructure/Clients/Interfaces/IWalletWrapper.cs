using Defender.Common.Clients.Wallet;
using Defender.Common.DB.Pagination;
using Defender.Portal.Application.DTOs.Banking;

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

    Task<TransactionDtoPagedResult>
        GetTransactionHistoryAsync(PaginationRequest paginationRequest);
}
