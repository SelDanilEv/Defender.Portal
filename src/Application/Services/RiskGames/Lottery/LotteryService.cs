using Defender.Common.DB.Pagination;
using Defender.Portal.Application.Common.Interfaces.Services.RiskGames.Lottery;
using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.RiskGames.Lottery;
using Defender.Portal.Application.Models.ApiRequests.RiskGames.Lottery;

namespace Defender.Portal.Application.Services.RiskGames.Lottery;

public class LotteryService(
        IRiskGamesWrapper riskGamesWrapper
    ) : ILotteryService
{
    public Task<PagedResult<LotteryDrawDto>> GetActiveDrawsAsync(PaginationRequest paginationRequest)
    {
        return riskGamesWrapper.GetActiveLotteryDrawsAsync(paginationRequest);
    }

    public Task<PagedResult<UserTicketDto>> GetUserTicketsAsync(PaginationRequest paginationRequest, Guid? userId = null)
    {
        return riskGamesWrapper.GetUserLotteryTicketsAsync(paginationRequest, userId);
    }

    public Task<List<int>> SearchAvailableTicketsAsync(SearchAvailableTicketsRequest request)
    {
        return riskGamesWrapper.SearchAvailableTicketsAsync(
            request.DrawNumber,
            request.AmountOfTickets,
            request.TargetTicket);
    }

    public Task<List<int>> PurchaseTicketsAsync(PurchaseTicketRequest request)
    {
        return riskGamesWrapper.PurchaseTicketsAsync(
            request.DrawNumber,
            request.Amount,
            request.Currency,
            request.TicketNumbers);
    }
}
