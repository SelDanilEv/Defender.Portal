using AutoMapper;
using Defender.Common.Attributes;
using Defender.Common.Consts;
using Defender.Common.DB.Pagination;
using Defender.Portal.Application.DTOs.BudgetTracking.DiagramSetup;
using Defender.Portal.Application.DTOs.BudgetTracking.Positions;
using Defender.Portal.Application.DTOs.BudgetTracking.Reviews;
using Defender.Portal.Application.Modules.BudgetTracking.BudgetMainDiagramSetups.Commands;
using Defender.Portal.Application.Modules.BudgetTracking.BudgetReviews.Commands;
using Defender.Portal.Application.Modules.BudgetTracking.BudgetReviews.Queries;
using Defender.Portal.Application.Modules.BudgetTracking.MainDiagramSetup.Queries;
using Defender.Portal.Application.Modules.BudgetTracking.Positions.Commands;
using Defender.Portal.Application.Modules.BudgetTracking.Positions.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Defender.Portal.WebUI.Controllers.V1;

public class BudgetTrackerController(IMediator mediator, IMapper mapper) 
    : BaseApiController(mediator, mapper)
{
    #region Position

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
    public async Task<ActionResult> CreatePosition([FromBody] CreatePositionCommand command)
    {
        return await ProcessApiCallAsync<CreatePositionCommand, PortalPosition>(command);
    }

    [HttpPut("position")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(PortalPosition), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> UpdatePosition([FromBody] UpdatePositionCommand command)
    {
        return await ProcessApiCallAsync<UpdatePositionCommand, PortalPosition>(command);
    }

    [HttpDelete("position/{Id}")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> DeletePosition(DeletePositionCommand command)
    {
        return await ProcessApiCallAsync<DeletePositionCommand, Guid>(command);
    }

    #endregion


    #region BudgetReview

    [HttpGet("budget-reviews")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(PagedResult<PortalBudgetReview>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> GetBudgetReviews([FromQuery] GetBudgetReviewsQuery query)
    {
        return await ProcessApiCallAsync<GetBudgetReviewsQuery, PagedResult<PortalBudgetReview>>(query);
    }

    [HttpGet("budget-reviews/by-date-range")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(List<PortalBudgetReview>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> GetBudgetReviewsByDateRanges([FromQuery] GetBudgetReviewsByDateRangeQuery query)
    {
        return await ProcessApiCallAsync<GetBudgetReviewsByDateRangeQuery, List<PortalBudgetReview>>(query);
    }

    [HttpGet("budget-review/template")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(PortalBudgetReview), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> CreateBudgetReview([FromQuery] GetBudgetReviewTemplateQuery query)
    {
        return await ProcessApiCallAsync<GetBudgetReviewTemplateQuery, PortalBudgetReview>(query);
    }

    [HttpPost("budget-review")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(PortalBudgetReview), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> UpdateBudgetReview([FromBody] PublishReviewCommand command)
    {
        return await ProcessApiCallAsync<PublishReviewCommand, PortalBudgetReview>(command);
    }

    [HttpDelete("budget-review/{Id}")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> DeleteBudgetReview(DeleteBudgetReviewCommand command)
    {
        return await ProcessApiCallAsync<DeleteBudgetReviewCommand, Guid>(command);
    }

    #endregion


    #region Main Diagram Setup

    [HttpGet("diagram-setup/main")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(PortalMainDiagramSetup), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> GetMainDiagramSetup([FromQuery] GetMainDiagramSetupQuery query)
    {
        return await ProcessApiCallAsync<GetMainDiagramSetupQuery, PortalMainDiagramSetup>(query);
    }

    [HttpPost("diagram-setup/main")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(PortalMainDiagramSetup), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> UpdateMainDiagramSetup([FromBody] PublishMainDiagramSetupCommand command)
    {
        return await ProcessApiCallAsync<PublishMainDiagramSetupCommand, PortalMainDiagramSetup>(command);
    }

    #endregion

}
