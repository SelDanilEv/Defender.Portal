﻿using Defender.Common.Errors;
using Defender.Portal.Application.Common.Interfaces;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Verification.Commands;

public record VerifyAccountEmailCommand : IRequest<bool>
{
    public int Code { get; set; }
    public int Hash { get; set; }
};

public sealed class VerifyAccountEmailCommandValidator : AbstractValidator<VerifyAccountEmailCommand>
{
    public VerifyAccountEmailCommandValidator()
    {
        RuleFor(s => s.Code)
                  .NotEmpty().WithMessage(ErrorCodeHelper.GetErrorCode(ErrorCode.VL_InvalidRequest));
        RuleFor(s => s.Hash)
                  .NotEmpty().WithMessage(ErrorCodeHelper.GetErrorCode(ErrorCode.VL_InvalidRequest));
    }
}

public sealed class VerifyAccountEmailCommandHandler : IRequestHandler<VerifyAccountEmailCommand, bool>
{
    private readonly IAuthorizationService _authorizationService;

    public VerifyAccountEmailCommandHandler(
        IAuthorizationService authorizationService
        )
    {
        _authorizationService = authorizationService;
    }

    public async Task<bool> Handle(VerifyAccountEmailCommand request, CancellationToken cancellationToken)
    {
        return await _authorizationService.VerifyEmailAsync(
            request.Hash,
            request.Code);
    }
}
