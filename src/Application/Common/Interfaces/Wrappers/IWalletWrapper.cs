using Defender.Common.DB.Pagination;
using Defender.Portal.Application.DTOs.Banking;
using Currency = Defender.Portal.Application.Enums.Currency;

namespace Defender.Portal.Application.Common.Interfaces.Wrappers;

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

    Task<PagedResult<PortalTransactionDto>> GetTransactionHistoryAsync(
        PaginationRequest paginationRequest,
        Guid? walletId = null);
}
