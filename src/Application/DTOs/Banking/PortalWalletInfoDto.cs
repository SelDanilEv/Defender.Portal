using Defender.Portal.Application.Enums;

namespace Defender.Portal.Application.DTOs.Banking;

public class PortalWalletInfoDto
{
    public Guid OwnerId { get; set; }
    public int WalletNumber { get; set; }
    public string? DefaultCurrency { get; set; } = Currency.USD.ToString();
    public List<CurrencyAccountDto>? CurrencyAccounts { get; set; }
}
