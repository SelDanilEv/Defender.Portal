using Defender.Portal.Application.Enums;

namespace Defender.Portal.Application.Models.ApiRequests.BugetTracker.Positions;

public record UpdatePositionRequest
{
    public Guid Id { get; set; }

    public string? Name { get; set; }

    public BudgetTrackerSupportedCurrency? Currency { get; set; }

    public List<string>? Tags { get; set; }

    public int? OrderPriority { get; set; }
}