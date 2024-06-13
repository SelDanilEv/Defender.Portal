using Defender.Common.Errors;
using Defender.Common.Extension;
using Defender.Portal.Application.Common.Interfaces.Services.RiskGames.Lottery;
using Defender.Portal.Application.Enums;
using Defender.Portal.Application.Models.ApiRequests.RiskGames.Lottery;
using FluentValidation;
using Defender.Common.Extension;
using MediatR;

namespace Defender.Portal.Application.Modules.RiskGames.Lottery.Commands;

public record PurchaseLotteryTicketsCommand :
    PurchaseTicketRequest, IRequest<List<int>>
{ }

public sealed class PurchaseLotteryTicketsCommandValidator
    : AbstractValidator<PurchaseLotteryTicketsCommand>
{
    public PurchaseLotteryTicketsCommandValidator()
    {
        RuleFor(x => x.DrawNumber)
            .GreaterThanOrEqualTo(0)
            .WithMessage(ErrorCode.VL_RGS_InvalidDrawNumber);

        RuleFor(x => x.Amount)
            .GreaterThan(0)
            .WithMessage(ErrorCode.VL_RGS_InvalidAmount);

        RuleFor(x => x.Currency)
            .Must(x => x != Currency.Unknown)
            .WithMessage(ErrorCode.BR_RGS_CurrencyIsNotAllowed);

        RuleFor(x => x.TicketNumbers)
            .NotEmpty()
            .Must(x => x.All(y => y > 0))
            .Must(x => x.Count > 0)
            .WithMessage(ErrorCode.VL_RGS_InvalidTicketNumber);
    }
}

public sealed class PurchaseLotteryTicketsCommandHandler(
        ILotteryService lotteryService)
    : IRequestHandler<PurchaseLotteryTicketsCommand, List<int>>
{
    public Task<List<int>> Handle(
        PurchaseLotteryTicketsCommand request,
        CancellationToken cancellationToken)
    {
        return lotteryService.PurchaseTicketsAsync(request);
    }
}
