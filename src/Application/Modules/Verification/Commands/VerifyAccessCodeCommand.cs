using Defender.Common.Errors;
using Defender.Common.Extension;
using Defender.Portal.Application.Common.Interfaces.Services;
using Defender.Portal.Application.Enums;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Verification.Commands;

public record VerifyAccessCodeCommand : IRequest<bool>
{
    public int Code { get; set; }
    public AccessCodeType Type { get; set; } = AccessCodeType.Default;
};

public sealed class VerifyAccessCodeCommandValidator : AbstractValidator<VerifyAccessCodeCommand>
{
    public VerifyAccessCodeCommandValidator()
    {
        RuleFor(s => s.Code)
            .NotEmpty()
            .WithMessage(ErrorCode.VL_USM_EmptyAccessCode);
    }
}

public sealed class VerifyAccessCodeCommandHandler(
        IAccessCodeService accessCodeService)
    : IRequestHandler<VerifyAccessCodeCommand, bool>
{
    public async Task<bool> Handle(
        VerifyAccessCodeCommand request,
        CancellationToken cancellationToken)
    {
        return await accessCodeService.VerifyAccessCodeAsync(
            request.Code,
            request.Type);
    }
}
