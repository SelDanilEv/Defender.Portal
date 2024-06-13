using Defender.Portal.Application.Enums;
using Defender.Portal.Application.Enums.RiskGames.Lottery;

namespace Defender.Portal.Application.DTOs.RiskGames.Lottery;

public record UserTicketDto
{
    public Guid Id { get; set; }
    public long DrawNumber { get; set; }
    public int TicketNumber { get; set; }
    public int Amount { get; set; }
    public Currency Currency { get; set; }
    public Guid UserId { get; set; }
    public string? PaymentTransactionId { get; set; }
    public string? PrizeTransactionId { get; set; }
    public int PrizePaidAmount { get; set; }
    public UserLotteryTicketStatus Status { get; set; }
}
