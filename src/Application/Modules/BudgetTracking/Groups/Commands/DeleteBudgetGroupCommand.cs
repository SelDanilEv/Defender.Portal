using Defender.Portal.Application.Common.Interfaces.Wrappers;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Defender.Portal.Application.Modules.BudgetTracking.Groups.Commands;

public record DeleteBudgetGroupCommand : IRequest<Guid>
{
    [FromRoute]
    public Guid Id { get; init; }
};

public sealed class DeleteBudgetGroupCommandValidator : AbstractValidator<DeleteBudgetGroupCommand>
{
    public DeleteBudgetGroupCommandValidator()
    {
    }
}

public sealed class DeleteBudgetGroupCommandHandler(
    IBudgetTrackerWrapper budgetTrackerWrapper)
    : IRequestHandler<DeleteBudgetGroupCommand, Guid>
{

    public Task<Guid> Handle(
        DeleteBudgetGroupCommand request,
        CancellationToken cancellationToken)
    {
        return budgetTrackerWrapper.DeleteBudgetGroupAsync(request.Id);
    }
}
