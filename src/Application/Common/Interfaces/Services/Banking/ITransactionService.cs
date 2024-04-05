using Defender.Common.Clients.Wallet;
using Defender.Common.DB.Pagination;
using Defender.Portal.Application.DTOs.Banking;

namespace Defender.Portal.Application.Common.Interfaces.Services.Banking;

public interface ITransactionService
{
    Task<PortalTransactionDto> StartTransferTransactionAsync(
        int walletNumber,
        int amount,
        Currency currency);

    Task<PagedResult<PortalTransactionDto>> GetTransactionHistoryAsync(
        PaginationRequest paginationRequest);

}
