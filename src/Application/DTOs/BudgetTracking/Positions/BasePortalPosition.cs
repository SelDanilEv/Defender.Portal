using Defender.Portal.Application.Enums;

namespace Defender.Portal.Application.DTOs.BudgetTracking.Positions;

public class BasePortalPosition
{
    public string Name { get; set; } = string.Empty;

    public BudgetTrackerSupportedCurrency Currency { get; set; }

    public List<string> Tags { get; set; } = [];

    public int OrderPriority { get; set; }
}
