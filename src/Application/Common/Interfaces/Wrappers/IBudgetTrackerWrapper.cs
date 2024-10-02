using Defender.Common.DB.Pagination;
using Defender.Portal.Application.DTOs.BudgetTracking.DiagramSetup;
using Defender.Portal.Application.DTOs.BudgetTracking.Positions;
using Defender.Portal.Application.DTOs.BudgetTracking.Reviews;
using Defender.Portal.Application.Models.ApiRequests.BugetTracker.BudgetReviews;
using Defender.Portal.Application.Models.ApiRequests.BugetTracker.Positions;

namespace Defender.Portal.Application.Common.Interfaces.Wrappers;

public interface IBudgetTrackerWrapper
{
    Task<PortalMainDiagramSetup> GetMainDiagramSetupAsync();
    Task<PortalMainDiagramSetup> UpdateMainDiagramSetupAsync(PortalMainDiagramSetup mainDiagramSetup);

    Task<PagedResult<PortalPosition>> GetPositionsAsync(PaginationRequest paginationRequest);
    Task<PortalPosition> CreatePositionAsync(CreatePositionRequest request);
    Task<PortalPosition> UpdatePositionAsync(UpdatePositionRequest request);
    Task<Guid> DeletePositionAsync(Guid id);

    Task<List<PortalBudgetReview>> GetBudgetReviewsByDateRangeAsync(DateOnly startDate, DateOnly endDate);
    Task<PagedResult<PortalBudgetReview>> GetBudgetReviewsAsync(PaginationRequest paginationRequest);
    Task<PortalBudgetReview> GetBudgetReviewTemplateAsync(DateOnly? date);
    Task<PortalBudgetReview> PublishBudgetReviewAsync(PublishBudgetRequestRequest request);
    Task<Guid> DeleteBudgetReviewAsync(Guid id);
}
