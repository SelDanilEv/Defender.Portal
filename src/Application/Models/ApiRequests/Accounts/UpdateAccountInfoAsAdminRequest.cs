using Defender.Common.Enums;

namespace Defender.Portal.Application.Models.ApiRequests.Accounts;

public record UpdateAccountInfoAsAdminRequest(
        Guid UserId,
        Role? Role,
        bool? IsPhoneVerified,
        bool? IsEmailVerified,
        bool? IsBlocked);
