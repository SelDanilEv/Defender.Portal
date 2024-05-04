using Defender.Common.Enums;

namespace Defender.Portal.Application.Models.ApiRequests;

public record UpdateAccountInfoAsAdminRequest(
        Guid UserId,
        Role? Role,
        bool? IsPhoneVerified,
        bool? IsEmailVerified,
        bool? IsBlocked);
