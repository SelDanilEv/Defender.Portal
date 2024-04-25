using Defender.Portal.Application.DTOs.Accounts;

namespace Defender.Portal.Application.DTOs.Auth;

[Serializable]
public record SessionDto
{
    public PortalAccountDto? User { get; set; }
    public string? Language { get; set; }
    public bool IsAuthenticated { get; set; }
    public string? Token { get; set; }
}
