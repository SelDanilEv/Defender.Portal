using Defender.Common.Interfaces;
using Defender.Common.Models;
using Defender.Common.Pagination;
using Defender.Portal.Application.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces.Repositories;
using Defender.Portal.Domain.Entities;
using Defender.Portal.Domain.Enums;

namespace Defender.Portal.Infrastructure.Services;

public class UserActivityService : IUserActivityService
{
    private readonly IUserActivityRepository _userActivityRepository;
    private readonly IAccountAccessor _accountAccessor;

    public UserActivityService(
        IUserActivityRepository userActivityRepository,
        IAccountAccessor accountAccessor)
    {
        _userActivityRepository = userActivityRepository;
        _accountAccessor = accountAccessor;
    }

    public async Task<PortalUserActivity> CreateUserActivity(ActivityCode code, string? message)
    {
        var currentUserId = _accountAccessor.AccountInfo.Id;

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
            var filterRequest = FindModelRequest<PortalUserActivity>.Init(x => x.UserId, userId);

            settings.AddFilter(filterRequest);
        }

        return await _userActivityRepository.GetUserActivitiesAsync(settings);
    }
}
