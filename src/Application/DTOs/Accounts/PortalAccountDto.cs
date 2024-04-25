namespace Defender.Portal.Application.DTOs.Accounts;

public class PortalAccountDto : PortalUserDto
{
    public bool IsEmailVerified { get; set; }
    public bool IsPhoneVerified { get; set; }
    public bool IsBlocked { get; set; }

    public ICollection<string> Roles { get; set; } = new List<string>();
}
