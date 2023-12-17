using Defender.Common.Configuration.Options;
using Defender.Common.DB.Pagination;
using Defender.Common.DB.Repositories;
using Defender.Portal.Application.Common.Interfaces.Repositories;
using Defender.Portal.Domain.Entities;
using Microsoft.Extensions.Options;

namespace Defender.Portal.Infrastructure.Repositories.Sample;

public class UserActivityRepository : BaseMongoRepository<PortalUserActivity>, IUserActivityRepository
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
