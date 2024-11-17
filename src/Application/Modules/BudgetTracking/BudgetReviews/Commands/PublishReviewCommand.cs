using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.BudgetTracking.Reviews;
using Defender.Portal.Application.Models.ApiRequests.BugetTracker.BudgetReviews;
using FluentValidation;
using MediatR;

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
