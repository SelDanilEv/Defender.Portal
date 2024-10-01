using Defender.Portal.Application.Common.Interfaces.Wrappers;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Defender.Portal.Application.Modules.BudgetTracking.BudgetReviews.Commands;

public record DeleteBudgetReviewCommand : IRequest<Guid>
{
    [FromRoute]
    public Guid Id { get; init; }
};

public sealed class DeleteBudgetReviewCommandValidator : AbstractValidator<DeleteBudgetReviewCommand>
{
    public DeleteBudgetReviewCommandValidator()
    {
    }
}

public sealed class DeleteBudgetReviewCommandHandler(
    IBudgetTrackerWrapper budgetTrackerWrapper)
    : IRequestHandler<DeleteBudgetReviewCommand, Guid>
{

    public Task<Guid> Handle(
        DeleteBudgetReviewCommand request,
        CancellationToken cancellationToken)
    {
        return budgetTrackerWrapper.DeleteBudgetReviewAsync(request.Id);
    }
}
