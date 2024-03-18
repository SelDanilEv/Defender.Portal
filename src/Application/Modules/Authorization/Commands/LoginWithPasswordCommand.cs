using Defender.Common.Errors;
using Defender.Portal.Application.Common.Interfaces.Services;
using Defender.Portal.Application.Models.Session;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Authorization.Commands;

public record LoginWithPasswordCommand : IRequest<Session>
{
    public string Login { get; set; }
    public string Password { get; set; }
};

public sealed class LoginWithPasswordCommandValidator : AbstractValidator<LoginWithPasswordCommand>
{
    public LoginWithPasswordCommandValidator()
    {
        RuleFor(s => s.Login)
                  .NotEmpty().WithMessage(ErrorCodeHelper.GetErrorCode(ErrorCode.VL_ACC_EmptyLogin));
        RuleFor(s => s.Password)
                  .NotEmpty().WithMessage(ErrorCodeHelper.GetErrorCode(ErrorCode.VL_ACC_EmptyPassword));
    }
}

public sealed class LoginWithPasswordCommandHandler : IRequestHandler<LoginWithPasswordCommand, Session>
{
    private readonly IAuthorizationService _authorizationService;

    public LoginWithPasswordCommandHandler(
        IAuthorizationService authorizationService
        )
    {
        _authorizationService = authorizationService;
    }

    public async Task<Session> Handle(LoginWithPasswordCommand request, CancellationToken cancellationToken)
    {
        return await _authorizationService.LoginAccountWithPasswordAsync(
            request.Login,
            request.Password);
    }
}
