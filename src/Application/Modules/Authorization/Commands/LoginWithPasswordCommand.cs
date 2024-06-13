using Defender.Common.Errors;
using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using Defender.Portal.Application.DTOs.Auth;
using FluentValidation;
using Defender.Common.Extension;
using MediatR;

namespace Defender.Portal.Application.Modules.Authorization.Commands;

public record LoginWithPasswordCommand(string Login, string Password) : IRequest<SessionDto>
{
};

public sealed class LoginWithPasswordCommandValidator : AbstractValidator<LoginWithPasswordCommand>
{
    public LoginWithPasswordCommandValidator()
    {
        RuleFor(s => s.Login)
            .NotEmpty().WithMessage(ErrorCode.VL_ACC_EmptyLogin);
        RuleFor(s => s.Password)
            .NotEmpty().WithMessage(ErrorCode.VL_ACC_EmptyPassword);
    }
}

public sealed class LoginWithPasswordCommandHandler(
        IAuthorizationService _authorizationService)
    : IRequestHandler<LoginWithPasswordCommand, SessionDto>
{

    public async Task<SessionDto> Handle(LoginWithPasswordCommand request, CancellationToken cancellationToken)
    {
        return await _authorizationService.LoginAccountWithPasswordAsync(
            request.Login,
            request.Password);
    }
}
