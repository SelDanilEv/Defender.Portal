using Defender.Common.Errors;
using Defender.Common.Extension;
using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.BudgetTracking.Positions;
using Defender.Portal.Application.Models.ApiRequests.BugetTracker.Positions;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.BudgetTracking.Positions.Commands;

public record CreatePositionCommand : CreatePositionRequest, IRequest<PortalBudgetPosition>
{
};

public sealed class CreatePositionCommandValidator : AbstractValidator<CreatePositionCommand>
{
    public CreatePositionCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage(ErrorCode.VL_BTS_InvalidPositionName);
    }
}

public sealed class CreatePositionCommandHandler(
        IBudgetTrackerWrapper budgetTrackerWrapper)
    : IRequestHandler<CreatePositionCommand, PortalBudgetPosition>
{

    public Task<PortalBudgetPosition> Handle(
        CreatePositionCommand request,
        CancellationToken cancellationToken)
    {
        return budgetTrackerWrapper.CreatePositionAsync(request);
    }
}
