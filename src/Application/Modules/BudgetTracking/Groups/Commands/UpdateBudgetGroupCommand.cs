using FluentValidation;
using MediatR;
using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.BudgetTracking.Groups;
using Defender.Portal.Application.Models.ApiRequests.BugetTracker.BudgetGroups;

namespace Defender.Portal.Application.Modules.BudgetTracking.Groups.Commands;

public record UpdateBudgetGroupCommand : UpdateBudgetGroupRequest, IRequest<PortalBudgetGroup>
{
};

public sealed class UpdateBudgetGroupCommandValidator : AbstractValidator<UpdateBudgetGroupCommand>
{
    public UpdateBudgetGroupCommandValidator()
    {
    }
}

public sealed class UpdateBudgetGroupCommandHandler(
        IBudgetTrackerWrapper budgetTrackerWrapper)
    : IRequestHandler<UpdateBudgetGroupCommand, PortalBudgetGroup>
{

    public Task<PortalBudgetGroup> Handle(
        UpdateBudgetGroupCommand request,
        CancellationToken cancellationToken)
    {
        return budgetTrackerWrapper.UpdateBudgetGroupAsync(request);
    }
}
