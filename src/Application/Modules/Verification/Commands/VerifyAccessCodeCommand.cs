using Defender.Common.Errors;
using Defender.Portal.Application.Common.Interfaces;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Verification.Commands;

public record VerifyAccessCodeCommand : IRequest<bool>
{
    public int Code { get; set; }
};

public sealed class VerifyAccessCodeCommandValidator : AbstractValidator<VerifyAccessCodeCommand>
{
    public VerifyAccessCodeCommandValidator()
    {
        RuleFor(s => s.Code)
                  .NotEmpty().WithMessage(ErrorCodeHelper.GetErrorCode(ErrorCode.VL_InvalidRequest));
    }
}

public sealed class VerifyAccessCodeCommandHandler : IRequestHandler<VerifyAccessCodeCommand, bool>
{
    private readonly IAccessCodeService _accessCodeService;

    public VerifyAccessCodeCommandHandler(
        IAccessCodeService accessCodeService
        )
    {
        _accessCodeService = accessCodeService;
    }

    public async Task<bool> Handle(VerifyAccessCodeCommand request, CancellationToken cancellationToken)
    {
        return await _accessCodeService.VerifyAccessCodeAsync(
            request.Code);
    }
}
