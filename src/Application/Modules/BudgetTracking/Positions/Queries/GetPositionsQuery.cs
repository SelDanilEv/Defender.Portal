using Defender.Common.DB.Pagination;
using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.BudgetTracking.Positions;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.BudgetTracking.Positions.Queries;

public record GetPositionsQuery : PaginationRequest, IRequest<PagedResult<PortalBudgetPosition>>
{
};

public sealed class GetPositionsQueryValidator : AbstractValidator<GetPositionsQuery>
{
    public GetPositionsQueryValidator()
    {
    }
}

public sealed class GetPositionsQueryHandler(
        IBudgetTrackerWrapper budgetTrackerWrapper)
    : IRequestHandler<GetPositionsQuery, PagedResult<PortalBudgetPosition>>
{

    public Task<PagedResult<PortalBudgetPosition>> Handle(
        GetPositionsQuery request,
        CancellationToken cancellationToken)
    {
        return budgetTrackerWrapper.GetPositionsAsync(request);
    }
}
