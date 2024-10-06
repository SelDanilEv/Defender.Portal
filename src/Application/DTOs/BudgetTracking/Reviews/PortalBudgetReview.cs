using Defender.Portal.Application.DTOs.BudgetTracking.Positions;
using Defender.Portal.Application.Enums;

namespace Defender.Portal.Application.DTOs.BudgetTracking.Reviews;

public class PortalBudgetReview
{
    public Guid Id { get; set; }

    public DateOnly Date { get; set; }

    public List<PortalReviewedBudgetPosition> Positions { get; set; } = [];

    public Currency BaseCurrency { get; set; }

    public Dictionary<Currency, decimal> Rates { get; set; } = [];
}
