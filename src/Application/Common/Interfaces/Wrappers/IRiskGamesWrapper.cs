using Defender.Common.DB.Pagination;
using Defender.Portal.Application.DTOs.RiskGames.Lottery;
using Currency = Defender.Portal.Application.Enums.Currency;

namespace Defender.Portal.Application.Common.Interfaces.Wrappers;

public interface IRiskGamesWrapper
{
    Task<PagedResult<LotteryDrawDto>> GetActiveLotteryDrawsAsync(PaginationRequest paginationRequest);

    Task<PagedResult<UserTicketDto>> GetUserLotteryTicketsAsync(
        PaginationRequest paginationRequest,
        Guid? userId = null);

    Task<List<int>> SearchAvailableTicketsAsync(long drawNumber, int amountOfTickets, int targetTicket = 0);

    Task<List<int>> PurchaseTicketsAsync(
        long drawNumber,
        int amount,
        Currency currency,
        HashSet<int> ticketNumbers);

}
