using Defender.Common.Errors;
using Defender.Portal.Application.Common.Interfaces;
using Defender.Portal.Application.Models.Session;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Authorization.Commands;

public record LoginWithGoogleTokenCommand : IRequest<Session>
{
    public string Token { get; set; }
};

public sealed class LoginWithGoogleTokenCommandValidator : AbstractValidator<LoginWithGoogleTokenCommand>
{
    public LoginWithGoogleTokenCommandValidator()
    {
        RuleFor(s => s.Token)
                  .NotEmpty().WithMessage(ErrorCodeHelper.GetErrorCode(ErrorCode.VL_InvalidRequest));
    }
}

public sealed class LoginWithGoogleTokenCommandHandler : IRequestHandler<LoginWithGoogleTokenCommand, Session>
{
    private readonly IAuthorizationService _authorizationService;

    public LoginWithGoogleTokenCommandHandler(
        IAuthorizationService authorizationService
        )
    {
        _authorizationService = authorizationService;
    }

    public async Task<Session> Handle(LoginWithGoogleTokenCommand request, CancellationToken cancellationToken)
    {
        return await _authorizationService.LoginAccountWithGoogleAsync(
            request.Token);
    }
}
