using Defender.Portal.Application.Enums;

namespace Defender.Portal.Application.DTOs.Banking;

public class PublicPortalWalletInfoDto
{
    public Guid OwnerId { get; set; }
    public string? OwnerName { get; set; }
    public int WalletNumber { get; set; }
    public List<Currency>? Currencies { get; set; }
}
