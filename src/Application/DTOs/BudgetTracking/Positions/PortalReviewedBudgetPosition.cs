namespace Defender.Portal.Application.DTOs.BudgetTracking.Positions;

public class PortalReviewedBudgetPosition : BasePortalPosition
{
    public static PortalReviewedBudgetPosition FromPosition(
        BasePortalPosition basePosition,
        long amount = 0)
    {
        return new PortalReviewedBudgetPosition
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
