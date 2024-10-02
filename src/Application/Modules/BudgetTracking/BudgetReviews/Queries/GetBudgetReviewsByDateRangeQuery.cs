using Defender.Common.DB.Pagination;
using FluentValidation;
using MediatR;
using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.BudgetTracking.Reviews;

namespace Defender.Portal.Application.Modules.BudgetTracking.BudgetReviews.Queries;

public record GetBudgetReviewsByDateRangeQuery : IRequest<List<PortalBudgetReview>>
{
    public DateOnly StartDate { get; set; } = DateOnly.MinValue;
    public DateOnly EndDate { get; set; } = DateOnly.MaxValue;
};

public sealed class GetBudgetReviewsByDateRangeQueryValidator
    : AbstractValidator<GetBudgetReviewsByDateRangeQuery>
{
    public GetBudgetReviewsByDateRangeQueryValidator()
    {
    }
}

public sealed class GetBudgetReviewsByDateRangeQueryHandler(
        IBudgetTrackerWrapper budgetTrackerWrapper)
    : IRequestHandler<GetBudgetReviewsByDateRangeQuery, List<PortalBudgetReview>>
{

    public Task<List<PortalBudgetReview>> Handle(
        GetBudgetReviewsByDateRangeQuery request,
        CancellationToken cancellationToken)
    {
        return budgetTrackerWrapper.GetBudgetReviewsByDateRangeAsync(request.StartDate, request.EndDate);
    }
}
