using Defender.Common.DTOs;
using Defender.Common.Errors;
using Defender.Common.Exceptions;
using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces.Services;
using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Account.Commands;

public record UpdateMyAccountSensitiveInfoCommand(
        string? Email,
        string? NewPassword,
        int Code)
    : IRequest<Unit>
{
};

public sealed class UpdateMyAccountSensitiveInfoCommandValidator : AbstractValidator<UpdateMyAccountSensitiveInfoCommand>
{
    public UpdateMyAccountSensitiveInfoCommandValidator()
    {
        RuleFor(x => x)
            .Must(x => !string.IsNullOrEmpty(x.Email) || !string.IsNullOrEmpty(x.NewPassword))
            .WithMessage(ErrorCodeHelper.GetErrorCode(
                               ErrorCode.VL_InvalidRequest));
    }
}

public sealed class UpdateMyAccountSensitiveInfoCommandHandler(
        IAccessCodeService accessCodeService,
        ICurrentAccountAccessor currentAccountAccessor,
        IAccountManagementService accountManagementService) :
    IRequestHandler<UpdateMyAccountSensitiveInfoCommand, Unit>
{
    public async Task<Unit> Handle(
        UpdateMyAccountSensitiveInfoCommand request,
        CancellationToken cancellationToken)
    {
        var isCodeValid = await accessCodeService.VerifyAccessCodeAsync(
            request.Code, 
            Enums.AccessCodeType.UpdateAccount);

        if (!isCodeValid)
        {
            throw new ServiceException(ErrorCode.BR_ACC_InvalidAccessCode);
        }

        var userId = currentAccountAccessor.GetAccountId();

        var user = new UserDto()
        {
            Id = userId,
            Email = request.Email
        };

        await accountManagementService.UpdateUserSensitiveInfoAsync(user, request.NewPassword);

        return Unit.Value;
    }
}
