using Defender.Common.Clients.Wallet;
using Defender.Portal.Application.DTOs.Wallets;

namespace Defender.Portal.Application.Common.Interfaces.Services.Wallets;

public interface ITransactionService
{
    Task<PortalTransactionDto> StartTransferTransactionAsync(
        int walletNumber,
        int amount,
        Currency currency);

}
