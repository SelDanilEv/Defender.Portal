using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.BudgetTracking.Reviews;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.BudgetTracking.BudgetReviews.Queries;

public record GetBudgetReviewTemplateQuery : IRequest<PortalBudgetReview>
{
    public DateOnly? Date { get; set; }
};

public sealed class GetBudgetReviewTemplateQueryValidator : AbstractValidator<GetBudgetReviewTemplateQuery>
{
    public GetBudgetReviewTemplateQueryValidator()
    {
    }
}

public sealed class GetBudgetReviewTemplateQueryHandler(
        IBudgetTrackerWrapper budgetTrackerWrapper)
    : IRequestHandler<GetBudgetReviewTemplateQuery, PortalBudgetReview>
{

    public Task<PortalBudgetReview> Handle(
        GetBudgetReviewTemplateQuery request,
        CancellationToken cancellationToken)
    {
        return budgetTrackerWrapper.GetBudgetReviewTemplateAsync(request.Date);
    }
}
