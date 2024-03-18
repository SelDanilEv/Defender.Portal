using AutoMapper;
using Defender.Portal.Application.DTOs.Wallet;
using Defender.Portal.Application.Modules.Wallet.Commands;
using Defender.Portal.Application.Modules.Wallet.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Defender.Portal.WebUI.Controllers.V1;

public class WalletController : BaseApiController
{
    public WalletController(IMediator mediator, IMapper mapper) : 
        base(mediator, mapper)
    {
    }

    [HttpGet("info")]
    [ProducesResponseType(typeof(PortalWalletInfoDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<PortalWalletInfoDto> GetWalletInfoAsync(
        [FromQuery] GetWalletInfoQuery query)
    {
        return await ProcessApiCallAsync<GetWalletInfoQuery, PortalWalletInfoDto>
            (query);
    }

    [HttpPost("account/create")]
    [ProducesResponseType(typeof(PortalWalletInfoDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<PortalWalletInfoDto> CreateCurrencyAccountAsync(
        [FromBody] CreateCurrencyAccountCommand command)
    {
        return await ProcessApiCallAsync<
            CreateCurrencyAccountCommand,
            PortalWalletInfoDto>
            (command);
    }
}
