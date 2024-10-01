using FluentValidation;
using MediatR;
using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.Models.ApiRequests.BugetTracker.BudgetReviews;
using Defender.Portal.Application.DTOs.BudgetTracking.Reviews;

namespace Defender.Portal.Application.Modules.BudgetTracking.BudgetReviews.Commands;

public record PublishReviewCommand : PublishBudgetRequestRequest, IRequest<PortalBudgetReview>
{
};

public sealed class PublishReviewCommandValidator : AbstractValidator<PublishReviewCommand>
{
    public PublishReviewCommandValidator()
    {
    }
}

public sealed class PublishReviewCommandHandler(
        IBudgetTrackerWrapper budgetTrackerWrapper)
    : IRequestHandler<PublishReviewCommand, PortalBudgetReview>
{

    public Task<PortalBudgetReview> Handle(
        PublishReviewCommand request,
        CancellationToken cancellationToken)
    {
        return budgetTrackerWrapper.PublishBudgetReviewAsync(request);
    }
}
