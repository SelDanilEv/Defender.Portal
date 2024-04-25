using Defender.Common.Enums;

namespace Defender.Portal.Application.Models.ApiRequests;

public record UpdateAccountInfoRequest(
        Guid UserId,
        Role? Role,
        bool? IsPhoneVerified,
        bool? IsEmailVerified,
        bool? IsBlocked);
