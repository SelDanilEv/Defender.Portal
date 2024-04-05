using Defender.Common.Clients.Wallet;

namespace Defender.Portal.Application.DTOs.Banking;

public class PortalWalletInfoDto
{
    public int WalletNumber { get; set; }
    public string? DefaultCurrency { get; set; } = Currency.USD.ToString();
    public List<CurrencyAccountDto>? CurrencyAccounts { get; set; }
}
