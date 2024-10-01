using Defender.Portal.Application.Common.Interfaces.Wrappers;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Defender.Portal.Application.Modules.BudgetTracking.Positions.Commands;

public record DeletePositionCommand : IRequest<Guid>
{
    [FromRoute]
    public Guid Id { get; init; }
};

public sealed class DeletePositionCommandValidator : AbstractValidator<DeletePositionCommand>
{
    public DeletePositionCommandValidator()
    {
    }
}

public sealed class DeletePositionCommandHandler(
    IBudgetTrackerWrapper budgetTrackerWrapper)
    : IRequestHandler<DeletePositionCommand, Guid>
{

    public Task<Guid> Handle(
        DeletePositionCommand request,
        CancellationToken cancellationToken)
    {
        return budgetTrackerWrapper.DeletePositionAsync(request.Id);
    }
}
