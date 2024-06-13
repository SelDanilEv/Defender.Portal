using Defender.Common.DB.Pagination;
using Defender.Portal.Application.Common.Interfaces.Services.Banking;
using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.Banking;
using Defender.Portal.Application.Enums;

namespace Defender.Portal.Application.Services.Banking;

public class TransactionService(
        IWalletWrapper walletWrapper
    ) : ITransactionService
{
    public async Task<PortalTransactionDto> StartTransferTransactionAsync(
        int walletNumber,
        int amount,
        Currency currency)
    {
        var transaction = await walletWrapper.StartTransferTransactionAsync(
            walletNumber, amount, currency);

        return transaction;
    }

    public async Task<PagedResult<PortalTransactionDto>> GetTransactionHistoryAsync(
        PaginationRequest paginationRequest, Guid? walletId = null)
    {
        var transactions = await walletWrapper.GetTransactionHistoryAsync(paginationRequest, walletId);

        return transactions;
    }

}
