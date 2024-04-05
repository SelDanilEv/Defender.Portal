using AutoMapper;
using Defender.Common.Clients.Wallet;
using Defender.Common.DB.Pagination;
using Defender.Portal.Application.Common.Interfaces.Services.Banking;
using Defender.Portal.Application.DTOs.Banking;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Services.Banking;

public class TransactionService(
        IMapper mapper,
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
        PaginationRequest paginationRequest)
    {
        var apiResult = await walletWrapper.GetTransactionHistoryAsync(paginationRequest);

        var transactions = mapper.Map<PagedResult<PortalTransactionDto>>(apiResult);

        return transactions;
    }

}
