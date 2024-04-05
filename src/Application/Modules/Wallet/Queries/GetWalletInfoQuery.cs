using Defender.Portal.Application.Common.Interfaces.Services.Banking;
using Defender.Portal.Application.DTOs.Banking;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Wallet.Queries;

public record GetWalletInfoQuery : IRequest<PortalWalletInfoDto>
{
};

public class GetWalletInfoQueryHandler(
        IWalletManagementService walletManagementService) : 
    IRequestHandler<GetWalletInfoQuery, PortalWalletInfoDto>
{
    public async Task<PortalWalletInfoDto> Handle(
        GetWalletInfoQuery request, 
        CancellationToken cancellationToken)
    {
        return await walletManagementService.GetCurrentWalletInfoAsync();
    }

}