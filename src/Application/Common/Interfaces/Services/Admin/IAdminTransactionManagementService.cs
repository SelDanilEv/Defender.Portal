using Defender.Portal.Application.DTOs.Banking;
using Defender.Portal.Application.Enums;

namespace Defender.Portal.Application.Common.Interfaces.Services.Admin;

public interface IAdminTransactionManagementService
{
    Task<PortalTransactionDto> StartRechargeTransactionAsync(
        int walletNumber,
        int amount,
        Currency currency);
}
