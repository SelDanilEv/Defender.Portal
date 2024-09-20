namespace Defender.Portal.Application.DTOs.BudgetTracking.Positions;

public class PortalReviewedPosition : BasePortalPosition
{
    public static PortalReviewedPosition FromPosition(
        BasePortalPosition basePosition,
        long amount = 0)
    {
        return new PortalReviewedPosition
        {
            Name = basePosition.Name,
            Currency = basePosition.Currency,
            Tags = basePosition.Tags,
            OrderPriority = basePosition.OrderPriority,
            Amount = amount
        };
    }

    public long Amount { get; set; }
}
