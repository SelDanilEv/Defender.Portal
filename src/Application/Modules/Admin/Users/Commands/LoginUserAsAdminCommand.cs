using Defender.Common.Errors;
using Defender.Portal.Application.Common.Interfaces.Services.Admin;
using Defender.Portal.Application.DTOs.Auth;
using FluentValidation;
using Defender.Common.Extension;
using MediatR;

namespace Defender.Portal.Application.Modules.Admin.Users.Commands;

public record LoginUserAsAdminCommand(
        Guid UserId)
    : IRequest<SessionDto>;

public sealed class LoginUserAsAdminCommandValidator : AbstractValidator<LoginUserAsAdminCommand>
{
    public LoginUserAsAdminCommandValidator()
    {
        RuleFor(x => x.UserId)
            .NotNull()
            .WithMessage(ErrorCode.VL_ACC_EmptyUserId);
    }
}

public sealed class LoginUserAsAdminCommandHandler(
        IAdminAccountManagementService accountManagementService)
    : IRequestHandler<LoginUserAsAdminCommand, SessionDto>
{
    public async Task<SessionDto> Handle(
        LoginUserAsAdminCommand request,
        CancellationToken cancellationToken)
    {
        return await accountManagementService.LoginAccountAsAdminAsync(request.UserId);
    }
}
