using Defender.Portal.Application.Common.Interfaces.Services.Admin;
using Defender.Portal.Application.DTOs.Banking;
using Defender.Portal.Application.Enums;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Services.Admin;

public class AdminTransactionManagementService(
        IWalletWrapper walletWrapper
    ) : IAdminTransactionManagementService
{
    public Task<PortalTransactionDto> StartRechargeTransactionAsync(int walletNumber, int amount, Currency currency)
    {
        return walletWrapper.StartRechargeTransactionAsync(walletNumber, amount, currency);
    }
}
