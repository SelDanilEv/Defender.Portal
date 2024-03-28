using Defender.Common.Errors;
using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using Defender.Portal.Application.Models.Session;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Authorization.Commands;

public record CreateAccountCommand(
        string? Email, 
        string? PhoneNumber,
        string? Nickname,
        string? Password) 
    : IRequest<Session>
{
};

public sealed class CreateAccountCommandValidator : AbstractValidator<CreateAccountCommand>
{
    public CreateAccountCommandValidator()
    {
        RuleFor(s => s.Email)
                  .NotEmpty().WithMessage(ErrorCodeHelper.GetErrorCode(ErrorCode.VL_ACC_EmptyEmail));
        RuleFor(s => s.Nickname)
                  .NotEmpty().WithMessage(ErrorCodeHelper.GetErrorCode(ErrorCode.VL_ACC_EmptyNickname));
        RuleFor(s => s.Password)
                  .NotEmpty().WithMessage(ErrorCodeHelper.GetErrorCode(ErrorCode.VL_ACC_EmptyPassword));
    }
}

public sealed class CreateAccountCommandHandler(IAuthorizationService _authorizationService) 
    : IRequestHandler<CreateAccountCommand, Session>
{
    public async Task<Session> Handle(CreateAccountCommand request, CancellationToken cancellationToken)
    {
        return await _authorizationService.CreateUserAccountAsync(
            request.Email,
            request.Nickname,
            request.PhoneNumber,
            request.Password);
    }
}
