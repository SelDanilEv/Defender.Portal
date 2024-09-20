using FluentValidation;
using MediatR;
using Defender.Common.Errors;
using Defender.Common.Extension;
using Defender.Portal.Application.DTOs.BudgetTracking.Positions;
using Defender.Portal.Application.Models.ApiRequests.BugetTracker.Positions;
using Defender.Portal.Application.Common.Interfaces.Wrappers;

namespace Defender.Portal.Application.Modules.BudgetTracking.Positions.Commands;

public record CreatePositionCommand : CreatePositionRequest, IRequest<PortalPosition>
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
    : IRequestHandler<CreatePositionCommand, PortalPosition>
{

    public Task<PortalPosition> Handle(
        CreatePositionCommand request,
        CancellationToken cancellationToken)
    {
        return budgetTrackerWrapper.CreatePositionAsync(request);
    }
}
