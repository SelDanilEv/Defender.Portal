using Defender.Common.Pagination;
using Defender.Portal.Domain.Entities;

namespace Defender.Portal.Application.Common.Interfaces.Repositories;

public interface IUserActivityRepository
{
    Task<PortalUserActivity> CreateUserActivityAsync(PortalUserActivity activity);
    Task<PagedResult<PortalUserActivity>> GetUserActivitiesAsync(PaginationSettings<PortalUserActivity> requst);
}
