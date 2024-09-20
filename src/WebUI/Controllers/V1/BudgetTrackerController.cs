using AutoMapper;
using Defender.Common.Attributes;
using Defender.Common.Consts;
using Defender.Common.DB.Pagination;
using Defender.Portal.Application.DTOs.BudgetTracking.Positions;
using Defender.Portal.Application.Modules.BudgetTracking.Positions.Commands;
using Defender.Portal.Application.Modules.BudgetTracking.Positions.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Defender.Portal.WebUI.Controllers.V1;

public class BudgetTrackerController(IMediator mediator, IMapper mapper) 
    : BaseApiController(mediator, mapper)
{
    [HttpGet("positions")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(PagedResult<PortalPosition>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> GetPositions([FromQuery] GetPositionsQuery query)
    {
        return await ProcessApiCallAsync<GetPositionsQuery, PagedResult<PortalPosition>>(query);
    }

    [HttpPost("position")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(PortalPosition), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> Create([FromBody] CreatePositionCommand command)
    {
        return await ProcessApiCallAsync<CreatePositionCommand, PortalPosition>(command);
    }

    [HttpPut("position")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(PortalPosition), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> Update([FromBody] UpdatePositionCommand command)
    {
        return await ProcessApiCallAsync<UpdatePositionCommand, PortalPosition>(command);
    }

    [HttpDelete("position")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> Delete(DeletePositionCommand command)
    {
        return await ProcessApiCallAsync<DeletePositionCommand, Guid>(command);
    }
}
