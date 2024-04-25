using Defender.Portal.Application.DTOs.Accounts;
using Defender.Portal.Application.DTOs.Banking;

namespace Defender.Portal.Application.DTOs.Admin;

public class FullUserInfoForAdminDto
{
    public PortalAccountDto? User { get; set; }
    public PortalWalletInfoDto? Wallet { get; set; }
}
