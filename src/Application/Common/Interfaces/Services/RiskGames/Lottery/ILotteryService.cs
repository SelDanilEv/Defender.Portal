using Defender.Common.DB.Pagination;
using Defender.Portal.Application.DTOs.RiskGames.Lottery;
using Defender.Portal.Application.Models.ApiRequests.RiskGames.Lottery;


namespace Defender.Portal.Application.Common.Interfaces.Services.RiskGames.Lottery;

public interface ILotteryService
{
    Task<PagedResult<LotteryDrawDto>> GetActiveDrawsAsync(PaginationRequest paginationRequest);

    Task<PagedResult<UserTicketDto>> GetUserTicketsAsync(
        PaginationRequest paginationRequest,
        Guid? userId = null);

    Task<List<int>> SearchAvailableTicketsAsync(SearchAvailableTicketsRequest request);

    Task<List<int>> PurchaseTicketsAsync(PurchaseTicketRequest request);
}
