using Defender.Common.Configuration.Options;
using Defender.Common.Pagination;
using Defender.Common.Repositories;
using Defender.Portal.Application.Common.Interfaces.Repositories;
using Defender.Portal.Domain.Entities;
using Microsoft.Extensions.Options;

namespace Defender.Portal.Infrastructure.Repositories.Sample;

public class UserActivityRepository : MongoRepository<PortalUserActivity>, IUserActivityRepository
{
    public UserActivityRepository(IOptions<MongoDbOptions> mongoOption) : base(mongoOption.Value)
    {
    }

    public async Task<PortalUserActivity> CreateUserActivityAsync(PortalUserActivity activity)
    {
        return await AddItemAsync(activity);
    }

    public async Task<PagedResult<PortalUserActivity>> GetUserActivitiesAsync(PaginationSettings<PortalUserActivity> settings)
    {
        return await GetItemsAsync(settings);
    }
}
