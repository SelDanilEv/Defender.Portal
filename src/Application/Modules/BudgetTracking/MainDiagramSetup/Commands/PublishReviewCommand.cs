using FluentValidation;
using MediatR;
using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.BudgetTracking.DiagramSetup;

namespace Defender.Portal.Application.Modules.BudgetTracking.BudgetMainDiagramSetups.Commands;

public record PublishMainDiagramSetupCommand : PortalMainDiagramSetup, IRequest<PortalMainDiagramSetup>
{
};

public sealed class PublishMainDiagramSetupCommandValidator : AbstractValidator<PublishMainDiagramSetupCommand>
{
    public PublishMainDiagramSetupCommandValidator()
    {
    }
}

public sealed class PublishMainDiagramSetupCommandHandler(
        IBudgetTrackerWrapper budgetTrackerWrapper)
    : IRequestHandler<PublishMainDiagramSetupCommand, PortalMainDiagramSetup>
{

    public Task<PortalMainDiagramSetup> Handle(
        PublishMainDiagramSetupCommand request,
        CancellationToken cancellationToken)
    {
        return budgetTrackerWrapper.UpdateMainDiagramSetupAsync(request);
    }
}
