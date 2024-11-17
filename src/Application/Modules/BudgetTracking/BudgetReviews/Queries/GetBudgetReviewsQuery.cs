using Defender.Common.DB.Pagination;
using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.BudgetTracking.Reviews;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.BudgetTracking.BudgetReviews.Queries;

public record GetBudgetReviewsQuery : PaginationRequest,
    IRequest<PagedResult<PortalBudgetReview>>
{
};

public sealed class GetBudgetReviewsQueryValidator : AbstractValidator<GetBudgetReviewsQuery>
{
    public GetBudgetReviewsQueryValidator()
    {
    }
}

public sealed class GetBudgetReviewsQueryHandler(
        IBudgetTrackerWrapper budgetTrackerWrapper)
    : IRequestHandler<GetBudgetReviewsQuery, PagedResult<PortalBudgetReview>>
{

    public Task<PagedResult<PortalBudgetReview>> Handle(
        GetBudgetReviewsQuery request,
        CancellationToken cancellationToken)
    {
        return budgetTrackerWrapper.GetBudgetReviewsAsync(request);
    }
}
