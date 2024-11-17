using Defender.Common.Errors;
using Defender.Common.Extension;
using Defender.Portal.Application.Common.Interfaces.Services.Admin;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Admin.Users.Commands;

public record UpdateAccountPasswordAsAdminCommand(
        Guid UserId,
        string NewPassword)
    : IRequest<Unit>
{
}

public sealed class UpdateAccountPasswordAsAdminCommandValidator : AbstractValidator<UpdateAccountPasswordAsAdminCommand>
{
    public UpdateAccountPasswordAsAdminCommandValidator()
    {
        RuleFor(x => x.UserId)
            .NotNull()
            .WithMessage(ErrorCode.VL_InvalidRequest);

        RuleFor(x => x.NewPassword)
            .NotNull()
            .WithMessage(ErrorCode.VL_ACC_EmptyPassword);
    }
}

public sealed class UpdateAccountPasswordAsAdminCommandHandler(
        IAdminAccountManagementService accountManagementService)
    : IRequestHandler<UpdateAccountPasswordAsAdminCommand, Unit>
{
    public async Task<Unit> Handle(
        UpdateAccountPasswordAsAdminCommand request,
        CancellationToken cancellationToken)
    {
        await accountManagementService.UpdateAccountPasswordAsync(request.UserId, request.NewPassword);

        return Unit.Value;
    }
}
