using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.BudgetTracking.DiagramSetup;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.BudgetTracking.MainDiagramSetup.Queries;

public record GetMainDiagramSetupQuery : IRequest<PortalMainDiagramSetup>
{
};

public sealed class GetMainDiagramSetupQueryValidator : AbstractValidator<GetMainDiagramSetupQuery>
{
    public GetMainDiagramSetupQueryValidator()
    {
    }
}

public sealed class GetMainDiagramSetupQueryHandler(
        IBudgetTrackerWrapper budgetTrackerWrapper)
    : IRequestHandler<GetMainDiagramSetupQuery, PortalMainDiagramSetup>
{

    public Task<PortalMainDiagramSetup> Handle(
        GetMainDiagramSetupQuery request,
        CancellationToken cancellationToken)
    {
        return budgetTrackerWrapper.GetMainDiagramSetupAsync();
    }
}
