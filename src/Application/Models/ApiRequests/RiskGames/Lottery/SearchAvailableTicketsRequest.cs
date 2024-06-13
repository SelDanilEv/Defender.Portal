namespace Defender.Portal.Application.Models.ApiRequests.RiskGames.Lottery;

public record SearchAvailableTicketsRequest
{
    public long DrawNumber { get; set; }
    public int AmountOfTickets { get; set; }
    public int TargetTicket { get; set; } = 0;
}
