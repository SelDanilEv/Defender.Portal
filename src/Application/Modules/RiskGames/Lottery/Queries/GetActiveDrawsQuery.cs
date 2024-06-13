using Defender.Common.DB.Pagination;
using Defender.Portal.Application.Common.Interfaces.Services.RiskGames.Lottery;
using Defender.Portal.Application.DTOs.RiskGames.Lottery;
using FluentValidation;
using Defender.Common.Extension;
using MediatR;

namespace Defender.Portal.Application.Modules.RiskGames.Lottery.Queries;

public record GetActiveDrawsQuery : PaginationRequest, IRequest<PagedResult<LotteryDrawDto>>
{
};

public sealed class GetActiveDrawsQueryValidator
    : AbstractValidator<GetActiveDrawsQuery>
{
    public GetActiveDrawsQueryValidator()
    {
    }
}

public class GetActiveDrawsQueryHandler(
        ILotteryService lotteryService) :
    IRequestHandler<GetActiveDrawsQuery, PagedResult<LotteryDrawDto>>
{
    public Task<PagedResult<LotteryDrawDto>> Handle(
        GetActiveDrawsQuery request,
        CancellationToken cancellationToken)
    {
        return lotteryService.GetActiveDrawsAsync(request);
    }
}