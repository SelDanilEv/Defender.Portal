using Defender.Common.Errors;
using Defender.Portal.Application.Common.Interfaces.Services.Admin;
using Defender.Portal.Application.DTOs.Banking;
using Defender.Portal.Application.Enums;
using FluentValidation;
using Defender.Common.Extension;
using MediatR;

namespace Defender.Portal.Application.Modules.Admin.Banking.Commands;

public record StartRechargeTransactionCommand(
    int WalletNumber,
    int Amount,
    Currency Currency) : IRequest<PortalTransactionDto>;

public sealed class StartRechargeTransactionCommandValidator : AbstractValidator<StartRechargeTransactionCommand>
{
    public StartRechargeTransactionCommandValidator()
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

public sealed class StartRechargeTransactionCommandHandler(
        IAdminTransactionManagementService transactionManagementService)
    : IRequestHandler<StartRechargeTransactionCommand, PortalTransactionDto>
{
    public async Task<PortalTransactionDto> Handle(
        StartRechargeTransactionCommand request,
        CancellationToken cancellationToken)
    {
        return await transactionManagementService
            .StartRechargeTransactionAsync(request.WalletNumber, request.Amount, request.Currency);
    }
}
