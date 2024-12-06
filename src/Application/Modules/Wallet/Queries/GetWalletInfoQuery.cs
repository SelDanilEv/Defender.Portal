using Defender.Common.Cache;
using Defender.Common.Interfaces;
using Defender.DistributedCache;
using Defender.Portal.Application.Common.Interfaces.Services.Banking;
using Defender.Portal.Application.DTOs.Banking;
using MediatR;

namespace Defender.Portal.Application.Modules.Wallet.Queries;

public record GetWalletInfoQuery : IRequest<PortalWalletInfoDto>
{
};

public class GetWalletInfoQueryHandler(
        ICurrentAccountAccessor currentAccountAccessor,
        IWalletManagementService walletManagementService,
        IDistributedCache distributedCache) :
    IRequestHandler<GetWalletInfoQuery, PortalWalletInfoDto>
{
    public async Task<PortalWalletInfoDto> Handle(
        GetWalletInfoQuery request,
        CancellationToken cancellationToken)
    {
        var cacheId = CacheConventionBuilder.BuildDistributedCacheKey(
            CacheForService.Portal, CacheModel.Wallet, 
                currentAccountAccessor.GetAccountId().ToString());

        return await distributedCache.Get<PortalWalletInfoDto>(cacheId,
            walletManagementService.GetCurrentWalletInfoAsync);
    }
}