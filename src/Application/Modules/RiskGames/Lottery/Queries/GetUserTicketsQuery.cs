using Defender.Common.DB.Pagination;
using Defender.Portal.Application.Common.Interfaces.Services.RiskGames.Lottery;
using Defender.Portal.Application.DTOs.RiskGames.Lottery;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.RiskGames.Lottery.Queries;

public record GetUserTicketsQuery : PaginationRequest, IRequest<PagedResult<UserTicketDto>>
{
    public Guid UserId { get; init; } = Guid.Empty;
};

public sealed class GetUserTicketsQueryValidator
    : AbstractValidator<GetUserTicketsQuery>
{
    public GetUserTicketsQueryValidator()
    {
    }
}

public class GetUserTicketsQueryHandler(
        ILotteryService lotteryService) :
    IRequestHandler<GetUserTicketsQuery, PagedResult<UserTicketDto>>
{
    public Task<PagedResult<UserTicketDto>> Handle(
        GetUserTicketsQuery request,
        CancellationToken cancellationToken)
    {
        return lotteryService.GetUserTicketsAsync(request, request.UserId);
    }
}