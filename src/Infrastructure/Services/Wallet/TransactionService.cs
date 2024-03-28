using Defender.Common.Clients.Wallet;
using Defender.Portal.Application.Common.Interfaces.Services.Wallets;
using Defender.Portal.Application.DTOs.Wallets;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Services.Wallet;

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
            walletNumber,amount,currency);

        return transaction;
    }
}
