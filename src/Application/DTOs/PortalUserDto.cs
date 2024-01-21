namespace Defender.Portal.Application.DTOs;

public class PortalUserDto
{
    public Guid Id { get; set; }
    public string? Email { get; set; }
    public string? Nickname { get; set; }
    public string? Phone { get; set; }

    public DateTime CreatedDate { get; set; }
}
