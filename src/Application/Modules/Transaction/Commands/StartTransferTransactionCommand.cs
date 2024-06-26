﻿using Defender.Common.Errors;
using Defender.Common.Extension;
using Defender.Portal.Application.Common.Interfaces.Services.Banking;
using Defender.Portal.Application.DTOs.Banking;
using Defender.Portal.Application.Enums;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Transaction.Commands;

public record StartTransferTransactionCommand(
    int WalletNumber,
    int Amount,
    Currency Currency) : IRequest<PortalTransactionDto>;

public sealed class StartTransferTransactionCommandValidator
    : AbstractValidator<StartTransferTransactionCommand>
{
    public StartTransferTransactionCommandValidator()
    {
        RuleFor(x => x.WalletNumber)
            .NotEmpty()
            .WithMessage(ErrorCode.VL_WLT_EmptyWalletNumber)
            .InclusiveBetween(10000000, 99999999)
            .WithMessage(ErrorCode.VL_WLT_InvalidWalletNumber);

        RuleFor(x => x.Amount)
            .GreaterThan(0)
            .WithMessage(ErrorCode.VL_WLT_TransferAmountMustBePositive);
    }
}

public sealed class StartTransferTransactionCommandHandler(
        ITransactionService transactionService)
    : IRequestHandler<StartTransferTransactionCommand, PortalTransactionDto>
{
    public async Task<PortalTransactionDto> Handle(
        StartTransferTransactionCommand request,
        CancellationToken cancellationToken)
    {
        return await transactionService.StartTransferTransactionAsync(
            request.WalletNumber,
            request.Amount,
            request.Currency);
    }
}
