using Defender.Portal.Application.Enums;

namespace Defender.Portal.Application.Models.ApiRequests.RiskGames.Lottery;

public record PurchaseTicketRequest
{
    public long DrawNumber { get; set; }
    public int Amount { get; set; }
    public Currency Currency { get; set; }
    public HashSet<int> TicketNumbers { get; set; } = [];
}
