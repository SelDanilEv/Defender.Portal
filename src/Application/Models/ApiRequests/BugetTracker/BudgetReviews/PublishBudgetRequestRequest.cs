using Defender.Portal.Application.DTOs.BudgetTracking.Positions;

namespace Defender.Portal.Application.Models.ApiRequests.BugetTracker.BudgetReviews;

public record PublishBudgetRequestRequest
{
    public Guid? Id { get; set; }

    public DateOnly Date { get; set; }

    public List<PortalReviewedPosition> Positions { get; set; } = [];
}