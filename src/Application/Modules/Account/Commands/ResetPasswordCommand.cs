using Defender.Common.Errors;
using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Account.Commands;

public record ResetPasswordCommand(
        Guid? UserId,
        string? NewPassword,
        int Code)
    : IRequest<Unit>
{
};

public sealed class ResetPasswordCommandValidator : AbstractValidator<ResetPasswordCommand>
{
    public ResetPasswordCommandValidator()
    {
        RuleFor(x => x.NewPassword)
            .NotEmpty()
            .WithMessage(ErrorCodeHelper.GetErrorCode(
                               ErrorCode.VL_InvalidRequest));
    }
}

public sealed class ResetPasswordCommandHandler(
        ICurrentAccountAccessor currentAccountAccessor,
        IAccountManagementService accountManagementService) :
    IRequestHandler<ResetPasswordCommand, Unit>
{
    public async Task<Unit> Handle(
        ResetPasswordCommand request,
        CancellationToken cancellationToken)
    {
        var  userId = request.UserId ?? currentAccountAccessor.GetAccountId();

        await accountManagementService.ChangeAccountPasswordAsync(
            userId,
            request.NewPassword,
            request.Code);

        return Unit.Value;
    }
}
