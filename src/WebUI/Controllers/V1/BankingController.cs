using AutoMapper;
using Defender.Common.Attributes;
using Defender.Common.Consts;
using Defender.Common.DB.Pagination;
using Defender.Portal.Application.DTOs.Banking;
using Defender.Portal.Application.Modules.Transaction.Commands;
using Defender.Portal.Application.Modules.Transaction.Queries;
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
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(PortalWalletInfoDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> GetWalletInfoAsync(
        [FromQuery] GetWalletInfoQuery query)
    {
        return await ProcessApiCallAsync<GetWalletInfoQuery, PortalWalletInfoDto>
            (query);
    }

    [HttpGet("wallet/info/public")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(PublicPortalWalletInfoDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> GetPublicWalletInfoAsync(
        [FromQuery] GetPublicWalletInfoByNumberQuery query)
    {
        return await ProcessApiCallAsync<
            GetPublicWalletInfoByNumberQuery,
            PublicPortalWalletInfoDto>
            (query);
    }

    [HttpPost("wallet/account/create")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(PortalWalletInfoDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> CreateCurrencyAccountAsync(
        [FromBody] CreateCurrencyAccountCommand command)
    {
        return await ProcessApiCallAsync<
            CreateCurrencyAccountCommand,
            PortalWalletInfoDto>
            (command);
    }

    [HttpGet("transaction/history")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(PagedResult<PortalTransactionDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> GetTransactionHistoryAsync(
        [FromQuery] GetTransactionHistoryQuery query)
    {
        return await ProcessApiCallAsync<
            GetTransactionHistoryQuery,
            PagedResult<PortalTransactionDto>>
            (query);
    }

    [HttpPost("transaction/start/transfer")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(PortalTransactionDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> StartTransferTransactionAsync(
        [FromBody] StartTransferTransactionCommand command)
    {
        return await ProcessApiCallAsync<
            StartTransferTransactionCommand,
            PortalTransactionDto>
            (command);
    }
}
