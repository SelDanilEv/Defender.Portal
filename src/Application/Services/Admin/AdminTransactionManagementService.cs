using Defender.Portal.Application.Common.Interfaces.Services.Admin;
using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.Banking;
using Defender.Portal.Application.Enums;

namespace Defender.Portal.Application.Services.Admin;

public class AdminTransactionManagementService(
        IWalletWrapper walletWrapper
    ) : IAdminTransactionManagementService
{
    public Task<PortalTransactionDto> StartRechargeTransactionAsync(int walletNumber, int amount, Currency currency)
    {
        return walletWrapper.StartRechargeTransactionAsync(walletNumber, amount, currency);
    }
}
