using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces.Services.Wallet;
using Defender.Portal.Application.DTOs.Wallet;
using MediatR;

namespace Defender.Portal.Application.Modules.Wallet.Queries;

public record GetWalletInfoQuery : IRequest<PortalWalletInfoDto>
{
};

public class GetWalletInfoQueryHandler : IRequestHandler<GetWalletInfoQuery, PortalWalletInfoDto>
{
    private readonly IWalletManagementService _walletManagementService;
    private readonly ICurrentAccountAccessor _currentAccountAccessor;

    public GetWalletInfoQueryHandler(
        IWalletManagementService walletManagementService,
        ICurrentAccountAccessor accountAccessor
        )
    {
        _walletManagementService = walletManagementService;
        _currentAccountAccessor = accountAccessor;
    }

    public async Task<PortalWalletInfoDto> Handle(GetWalletInfoQuery request, CancellationToken cancellationToken)
    {
        return await _walletManagementService.GetCurrentWalletInfoAsync();
    }

}