using AutoMapper;
using Defender.Common.Clients.RiskGames;
using Defender.Common.DB.Pagination;
using Defender.Common.Helpers;
using Defender.Common.Interfaces;
using Defender.Common.Wrapper.Internal;
using Defender.Portal.Application.Common.Interfaces.Wrappers;
using LotteryDraw = Defender.Portal.Application.DTOs.RiskGames.Lottery.LotteryDrawDto;
using UserTicket = Defender.Portal.Application.DTOs.RiskGames.Lottery.UserTicketDto;

namespace Defender.Portal.Infrastructure.Clients.RiskGames;

using Currency = Application.Enums.Currency;

public class RiskGamesWrapper(
    IAuthenticationHeaderAccessor authenticationHeaderAccessor,
    IRiskGamesServiceClient serviceClient,
    IMapper mapper
    ) : BaseInternalSwaggerWrapper(
            serviceClient,
            authenticationHeaderAccessor
        ), IRiskGamesWrapper
{
    public Task<PagedResult<LotteryDraw>> GetActiveLotteryDrawsAsync(
        PaginationRequest paginationRequest)
    {
        return ExecuteSafelyAsync(async () =>
        {
            var response = await serviceClient.ActiveAsync(paginationRequest.Page, paginationRequest.PageSize);

            return mapper.Map<PagedResult<LotteryDraw>>(response);
        }, AuthorizationType.User);
    }

    public Task<PagedResult<UserTicket>> GetUserLotteryTicketsAsync(
        PaginationRequest paginationRequest,
        Guid? userId = null)
    {
        return ExecuteSafelyAsync(async () =>
        {
            var response = await serviceClient.TicketsAsync(userId, paginationRequest.Page, paginationRequest.PageSize);

            return mapper.Map<PagedResult<UserTicket>>(response);
        }, AuthorizationType.User);
    }

    public Task<List<int>> PurchaseTicketsAsync(long drawNumber, int amount, Currency currency, HashSet<int> ticketNumbers)
    {
        return ExecuteSafelyAsync(async () =>
        {
            var command = new PurchaseLotteryTicketCommand
            {
                DrawNumber = drawNumber,
                Amount = amount,
                Currency = MappingHelper.MapEnum
                    (currency, PurchaseLotteryTicketCommandCurrency.USD),
                TicketNumbers = ticketNumbers.ToList()
            };

            var response = await serviceClient.PurchaseAsync(command);

            return response.ToList();
        }, AuthorizationType.User);
    }

    public Task<List<int>> SearchAvailableTicketsAsync(long drawNumber, int amountOfTickets, int targetTicket = 0)
    {
        return ExecuteSafelyAsync(async () =>
        {
            var response = await serviceClient.SearchAsync(targetTicket, amountOfTickets, drawNumber);

            return response.ToList();
        }, AuthorizationType.User);
    }
}
