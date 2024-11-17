using Defender.Common.Errors;
using Defender.Common.Extension;
using Defender.Portal.Application.Common.Interfaces.Services;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Verification.Commands;

public record SendPasswordResetCodeCommand : IRequest<Guid>
{
    public string? Email { get; set; }
};


public sealed class SendPasswordResetCodeCommandValidator
    : AbstractValidator<SendPasswordResetCodeCommand>
{
    public SendPasswordResetCodeCommandValidator()
    {
        RuleFor(s => s.Email)
            .NotEmpty()
            .WithMessage(ErrorCode.VL_ACC_EmptyEmail)
            .EmailAddress()
            .WithMessage(ErrorCode.VL_ACC_InvalidEmail);
    }
}

public class SendPasswordResetCodeCommandHandler(
        IAccessCodeService accessCodeService)
    : IRequestHandler<SendPasswordResetCodeCommand, Guid>
{
    public async Task<Guid> Handle(
        SendPasswordResetCodeCommand request,
        CancellationToken cancellationToken)
    {
        return await accessCodeService.SendPasswordResetAccessCodeAsync(request.Email);
    }
}


