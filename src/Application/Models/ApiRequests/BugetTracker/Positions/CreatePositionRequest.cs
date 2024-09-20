using Defender.Portal.Application.Enums;

namespace Defender.Portal.Application.Models.ApiRequests.BugetTracker.Positions;

public record CreatePositionRequest
{
    public string Name { get; set; } = string.Empty;

    public BudgetTrackerSupportedCurrency Currency { get; set; }

    public List<string> Tags { get; set; } = [];

    public int OrderPriority { get; set; } = -1;
}
