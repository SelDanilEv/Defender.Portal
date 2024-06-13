using AutoMapper;
using Defender.Common.Attributes;
using Defender.Common.Consts;
using Defender.Common.DB.Pagination;
using Defender.Portal.Application.DTOs.RiskGames.Lottery;
using Defender.Portal.Application.Modules.RiskGames.Lottery.Commands;
using Defender.Portal.Application.Modules.RiskGames.Lottery.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Defender.Portal.WebUI.Controllers.V1;

public class LotteryController(
        IMediator mediator,
        IMapper mapper)
    : BaseApiController(mediator, mapper)
{
    [HttpGet("draw/active")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(PagedResult<LotteryDrawDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> GetActiveDrawsAsync(
        [FromQuery] GetActiveDrawsQuery query)
    {
        return await ProcessApiCallAsync<GetActiveDrawsQuery, PagedResult<LotteryDrawDto>>(query);
    }

    [HttpGet("tickets")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(PagedResult<UserTicketDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> GetUserTicketsAsync(
        [FromQuery] GetUserTicketsQuery query)
    {
        return await ProcessApiCallAsync<GetUserTicketsQuery, PagedResult<UserTicketDto>>(query);
    }

    [HttpGet("tickets/available")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(List<int>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> SearchAvailableTicketsAsync(
        [FromQuery] SearchAvailableTicketsQuery query)
    {
        return await ProcessApiCallAsync<SearchAvailableTicketsQuery, List<int>>(query);
    }

    [HttpPost("tickets/purchase")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(List<int>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> PurchaseTicketsAsync(
        [FromBody] PurchaseLotteryTicketsCommand command)
    {
        return await ProcessApiCallAsync<PurchaseLotteryTicketsCommand, List<int>>(command);
    }


}
