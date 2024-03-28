using Defender.Common.Errors;
using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using Defender.Portal.Application.Models.Session;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Authorization.Commands;

public record LoginWithGoogleTokenCommand(string Token) : IRequest<Session>;

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
    : IRequestHandler<LoginWithGoogleTokenCommand, Session>
{
    public async Task<Session> Handle(LoginWithGoogleTokenCommand request, CancellationToken cancellationToken)
    {
        return await _authorizationService.LoginAccountWithGoogleAsync(
            request.Token);
    }
}
