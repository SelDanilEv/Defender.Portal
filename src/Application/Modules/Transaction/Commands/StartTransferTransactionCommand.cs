using Defender.Common.Clients.Wallet;
using Defender.Common.Errors;
using Defender.Portal.Application.Common.Interfaces.Services.Wallets;
using Defender.Portal.Application.DTOs.Wallets;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Transaction.Commands;

public record StartTransferTransactionCommand : IRequest<PortalTransactionDto>
{
    public int WalletNumber { get; set; }
    public int Amount { get; set; }
    public Currency Currency { get; set; }
};

public sealed class StartTransferTransactionCommandValidator 
    : AbstractValidator<StartTransferTransactionCommand>
{
    public StartTransferTransactionCommandValidator()
    {
        RuleFor(x => x.WalletNumber)
            .NotEmpty()
            .WithMessage(ErrorCodeHelper.GetErrorCode(
                ErrorCode.VL_WLT_EmptyWalletNumber))
            .InclusiveBetween(10000000, 99999999)
            .WithMessage(ErrorCodeHelper.GetErrorCode(
                ErrorCode.VL_WLT_InvalidWalletNumber));

        RuleFor(x => x.Amount)
            .GreaterThan(0)
            .WithMessage(ErrorCodeHelper.GetErrorCode(
                ErrorCode.VL_WLT_TransferAmountMustBePositive));
    }
}

public sealed class StartTransferTransactionCommandHandler (
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
