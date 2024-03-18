using Defender.Common.Interfaces;
using Defender.Common.DB.Pagination;
using Defender.Portal.Application.Common.Interfaces.Repositories;
using Defender.Portal.Domain.Entities;
using Defender.Portal.Domain.Enums;
using Defender.Common.DB.Model;
using Defender.Portal.Application.Common.Interfaces.Services;

namespace Defender.Portal.Infrastructure.Services;

public class UserActivityService : IUserActivityService
{
    private readonly IUserActivityRepository _userActivityRepository;
    private readonly ICurrentAccountAccessor _currentAccountAccessor;

    public UserActivityService(
        IUserActivityRepository userActivityRepository,
        ICurrentAccountAccessor currentAccountAccessor)
    {
        _userActivityRepository = userActivityRepository;
        _currentAccountAccessor = currentAccountAccessor;
    }

    public async Task<PortalUserActivity> CreateUserActivity(ActivityCode code, string? message)
    {
        var currentUserId = _currentAccountAccessor.GetAccountId();

        var userActivity = PortalUserActivity.Create(currentUserId, code, message);

        return await _userActivityRepository.CreateUserActivityAsync(userActivity);
    }

    public async Task<PagedResult<PortalUserActivity>> GetUserActivities(
        PaginationRequest request,
        Guid? userId)
    {
        var settings = PaginationSettings<PortalUserActivity>.FromPaginationRequest(request);

        if (userId != null)
        {
            var filterRequest = FindModelRequest<PortalUserActivity>
                .Init(x => x.UserId, userId);

            settings.SetupFindOptions(filterRequest);
        }

        return await _userActivityRepository.GetUserActivitiesAsync(settings);
    }
}
