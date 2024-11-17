using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.BudgetTracking.Groups;
using Defender.Portal.Application.Models.ApiRequests.BugetTracker.BudgetGroups;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.BudgetTracking.Groups.Commands;

public record CreateBudgetGroupCommand : CreateBudgetGroupRequest, IRequest<PortalBudgetGroup>
{
};

public sealed class CreateBudgetGroupCommandValidator : AbstractValidator<CreateBudgetGroupCommand>
{
    public CreateBudgetGroupCommandValidator()
    {
    }
}

public sealed class CreateBudgetGroupCommandHandler(
        IBudgetTrackerWrapper budgetTrackerWrapper)
    : IRequestHandler<CreateBudgetGroupCommand, PortalBudgetGroup>
{

    public Task<PortalBudgetGroup> Handle(
        CreateBudgetGroupCommand request,
        CancellationToken cancellationToken)
    {
        return budgetTrackerWrapper.CreateBudgetGroupAsync(request);
    }
}
