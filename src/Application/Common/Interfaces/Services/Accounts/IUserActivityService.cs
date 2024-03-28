using Defender.Common.DB.Pagination;
using Defender.Portal.Domain.Entities;
using Defender.Portal.Domain.Enums;

namespace Defender.Portal.Application.Common.Interfaces.Services.Accounts;

public interface IUserActivityService
{
    Task<PortalUserActivity> CreateUserActivity(ActivityCode code, string? message);
    Task<PagedResult<PortalUserActivity>> GetUserActivities(PaginationRequest request, Guid? userId);
}
