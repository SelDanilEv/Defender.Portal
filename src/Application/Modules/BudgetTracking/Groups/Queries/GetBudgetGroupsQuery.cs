using Defender.Common.DB.Pagination;
using FluentValidation;
using MediatR;
using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.BudgetTracking.Groups;

namespace Defender.Portal.Application.Modules.BudgetTracking.Groups.Queries;

public record GetBudgetGroupsQuery : PaginationRequest, IRequest<PagedResult<PortalBudgetGroup>>
{
};

public sealed class GetBudgetGroupsQueryValidator : AbstractValidator<GetBudgetGroupsQuery>
{
    public GetBudgetGroupsQueryValidator()
    {
    }
}

public sealed class GetBudgetGroupsQueryHandler(
        IBudgetTrackerWrapper budgetTrackerWrapper)
    : IRequestHandler<GetBudgetGroupsQuery, PagedResult<PortalBudgetGroup>>
{

    public Task<PagedResult<PortalBudgetGroup>> Handle(
        GetBudgetGroupsQuery request,
        CancellationToken cancellationToken)
    {
        return budgetTrackerWrapper.GetBudgetGroupsAsync(request);
    }
}
