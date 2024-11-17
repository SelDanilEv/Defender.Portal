using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.BudgetTracking.DiagramSetup;
using Defender.Portal.Application.Enums;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.BudgetTracking.MainDiagramSetup.Commands;

public record PublishMainDiagramSetupCommand : IRequest<PortalMainDiagramSetup>
{
    public DateOnly EndDate { get; set; }
    public int LastMonths { get; set; }
    public BudgetTrackerSupportedCurrency MainCurrency { get; set; }

    public PortalMainDiagramSetup ToMainDiagramSetup()
    {
        return new PortalMainDiagramSetup
        {
            EndDate = EndDate,
            LastMonths = LastMonths,
            MainCurrency = MainCurrency
        };
    }

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
        return budgetTrackerWrapper.UpdateMainDiagramSetupAsync(request.ToMainDiagramSetup());
    }
}
