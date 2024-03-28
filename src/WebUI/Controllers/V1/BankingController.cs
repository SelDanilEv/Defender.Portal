using AutoMapper;
using Defender.Portal.Application.DTOs.Wallets;
using Defender.Portal.Application.Modules.Transaction.Commands;
using Defender.Portal.Application.Modules.Wallet.Commands;
using Defender.Portal.Application.Modules.Wallet.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Defender.Portal.WebUI.Controllers.V1;

public class BankingController(
        IMediator mediator, 
        IMapper mapper) 
    : BaseApiController(mediator, mapper)
{

    [HttpGet("wallet/info")]
    [ProducesResponseType(typeof(PortalWalletInfoDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<PortalWalletInfoDto> GetWalletInfoAsync(
        [FromQuery] GetWalletInfoQuery query)
    {
        return await ProcessApiCallAsync<GetWalletInfoQuery, PortalWalletInfoDto>
            (query);
    }

    [HttpGet("wallet/info/public")]
    [ProducesResponseType(typeof(PublicPortalWalletInfoDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<PublicPortalWalletInfoDto> GetPublicWalletInfoAsync(
        [FromQuery] GetPublicWalletInfoByNumberQuery query)
    {
        return await ProcessApiCallAsync<
            GetPublicWalletInfoByNumberQuery,
            PublicPortalWalletInfoDto>
            (query);
    }

    [HttpPost("wallet/account/create")]
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

    [HttpPost("transaction/start/transfer")]
    [ProducesResponseType(typeof(PortalTransactionDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<PortalTransactionDto> StartTransferTransactionAsync(
        [FromBody] StartTransferTransactionCommand command)
    {
        return await ProcessApiCallAsync<
            StartTransferTransactionCommand,
            PortalTransactionDto>
            (command);
    }
}
