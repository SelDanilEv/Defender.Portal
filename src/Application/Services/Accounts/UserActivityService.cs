using Defender.Common.DB.Model;
using Defender.Common.DB.Pagination;
using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces.Repositories;
using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using Defender.Portal.Domain.Entities;
using Defender.Portal.Domain.Enums;

namespace Defender.Portal.Application.Services.Accounts;

public class UserActivityService(
        IUserActivityRepository userActivityRepository,
        ICurrentAccountAccessor currentAccountAccessor)
    : IUserActivityService
{
    public async Task<PortalUserActivity> CreateUserActivity(
        ActivityCode code,
        string? message)
    {
        var currentUserId = currentAccountAccessor.GetAccountId();

        var userActivity = PortalUserActivity.Create(
            currentUserId,
            code,
            message);

        return await userActivityRepository
            .CreateUserActivityAsync(userActivity);
    }

    public async Task<PagedResult<PortalUserActivity>> GetUserActivities(
        PaginationRequest request,
        Guid? userId)
    {
        var settings = PaginationSettings<PortalUserActivity>
            .FromPaginationRequest(request);

        if (userId != null)
        {
            var filterRequest = FindModelRequest<PortalUserActivity>
                .Init(x => x.UserId, userId);

            settings.SetupFindOptions(filterRequest);
        }

        return await userActivityRepository
            .GetUserActivitiesAsync(settings);
    }
}
