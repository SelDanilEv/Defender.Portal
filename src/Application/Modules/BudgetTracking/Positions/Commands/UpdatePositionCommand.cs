using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.BudgetTracking.Positions;
using Defender.Portal.Application.Models.ApiRequests.BugetTracker.Positions;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.BudgetTracking.Positions.Commands;

public record UpdatePositionCommand : UpdatePositionRequest, IRequest<PortalBudgetPosition>
{
};

public sealed class UpdatePositionCommandValidator : AbstractValidator<UpdatePositionCommand>
{
    public UpdatePositionCommandValidator()
    {
    }
}

public sealed class UpdatePositionCommandHandler(
        IBudgetTrackerWrapper budgetTrackerWrapper)
    : IRequestHandler<UpdatePositionCommand, PortalBudgetPosition>
{

    public Task<PortalBudgetPosition> Handle(
        UpdatePositionCommand request,
        CancellationToken cancellationToken)
    {
        return budgetTrackerWrapper.UpdatePositionAsync(request);
    }
}
