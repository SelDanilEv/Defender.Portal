using Defender.Common.Errors;
using Defender.Common.Extension;
using Defender.Portal.Application.Common.Interfaces.Services.RiskGames.Lottery;
using Defender.Portal.Application.Models.ApiRequests.RiskGames.Lottery;
using FluentValidation;
using Defender.Common.Extension;
using MediatR;

namespace Defender.Portal.Application.Modules.RiskGames.Lottery.Queries;

public record SearchAvailableTicketsQuery
    : SearchAvailableTicketsRequest, IRequest<List<int>>
{
};

public sealed class SearchAvailableTicketsQueryValidator
    : AbstractValidator<SearchAvailableTicketsQuery>
{
    public SearchAvailableTicketsQueryValidator()
    {
        RuleFor(x => x.DrawNumber)
            .GreaterThanOrEqualTo(0)
            .WithMessage(ErrorCode.VL_RGS_InvalidDrawNumber);

        RuleFor(x => x.AmountOfTickets)
            .GreaterThan(0)
            .WithMessage(ErrorCode.VL_RGS_AmountOfTicketsMustBePositive);
    }
}

public class SearchAvailableTicketsQueryHandler(
        ILotteryService lotteryService) :
    IRequestHandler<SearchAvailableTicketsQuery, List<int>>
{
    public Task<List<int>> Handle(
        SearchAvailableTicketsQuery request,
        CancellationToken cancellationToken)
    {
        return lotteryService.SearchAvailableTicketsAsync(request);
    }
}