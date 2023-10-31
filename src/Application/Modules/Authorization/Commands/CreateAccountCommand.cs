using Defender.Common.Errors;
using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces;
using Defender.Portal.Application.Models.Session;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Authorization.Commands;

public record CreateAccountCommand : IRequest<Session>
{
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string Nickname { get; set; }
    public string Password { get; set; }
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

public sealed class CreateAccountCommandHandler : IRequestHandler<CreateAccountCommand, Session>
{
    private readonly IAccountAccessor _accountAccessor;
    private readonly IAuthorizationService _authorizationService;

    public CreateAccountCommandHandler(
        IAccountAccessor accountAccessor,
        IAuthorizationService authorizationService
        )
    {
        _accountAccessor = accountAccessor;
        _authorizationService = authorizationService;
    }

    public async Task<Session> Handle(CreateAccountCommand request, CancellationToken cancellationToken)
    {
        return await _authorizationService.CreateUserAccountAsync(
            request.Email,
            request.Nickname,
            request.PhoneNumber,
            request.Password);
    }
}
