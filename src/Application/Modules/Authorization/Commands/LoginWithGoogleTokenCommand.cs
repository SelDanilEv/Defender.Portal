using Defender.Common.Errors;
using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using Defender.Portal.Application.DTOs.Auth;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Authorization.Commands;

public record LoginWithGoogleTokenCommand(string Token) : IRequest<SessionDto>;

public sealed class LoginWithGoogleTokenCommandValidator : AbstractValidator<LoginWithGoogleTokenCommand>
{
    public LoginWithGoogleTokenCommandValidator()
    {
        RuleFor(s => s.Token)
                  .NotEmpty().WithMessage(ErrorCodeHelper.GetErrorCode(ErrorCode.VL_InvalidRequest));
    }
}

public sealed class LoginWithGoogleTokenCommandHandler(
        IAuthorizationService _authorizationService) 
    : IRequestHandler<LoginWithGoogleTokenCommand, SessionDto>
{
    public async Task<SessionDto> Handle(LoginWithGoogleTokenCommand request, CancellationToken cancellationToken)
    {
        return await _authorizationService.LoginAccountWithGoogleAsync(
            request.Token);
    }
}
