using AutoMapper;
using Defender.Common.Clients.BudgetTracker;
using Defender.Common.DB.Pagination;
using Defender.Common.Helpers;
using Defender.Common.Interfaces;
using Defender.Common.Wrapper.Internal;
using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.BudgetTracking.DiagramSetup;
using Defender.Portal.Application.DTOs.BudgetTracking.Groups;
using Defender.Portal.Application.DTOs.BudgetTracking.Positions;
using Defender.Portal.Application.DTOs.BudgetTracking.Reviews;
using Defender.Portal.Application.Models.ApiRequests.BugetTracker.BudgetGroups;
using Defender.Portal.Application.Models.ApiRequests.BugetTracker.BudgetReviews;
using Defender.Portal.Application.Models.ApiRequests.BugetTracker.Positions;

namespace Defender.Portal.Infrastructure.Clients.BudgetTracker;

public class BudgetTrackerWrapper(
        IAuthenticationHeaderAccessor authenticationHeaderAccessor,
        IBudgetTrackerServiceClient serviceClient,
        IMapper mapper
    ) : BaseInternalSwaggerWrapper(
            serviceClient,
            authenticationHeaderAccessor
        ), IBudgetTrackerWrapper
{
    #region MainDiagramSetup

    public async Task<PortalMainDiagramSetup> GetMainDiagramSetupAsync()
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var query = new GetMainDiagramSetupQuery();
            var response = await serviceClient.DiagramSetupGETAsync(query);

            return mapper.Map<PortalMainDiagramSetup>(response);
        }, AuthorizationType.User);
    }

    public async Task<PortalMainDiagramSetup> UpdateMainDiagramSetupAsync(
        PortalMainDiagramSetup mainDiagramSetup)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new UpdateMainDiagramSetupCommand()
            {
                EndDate = mainDiagramSetup.EndDate,
                LastMonths = mainDiagramSetup.LastMonths,
                MainCurrency = MappingHelper.MapEnum(
                    mainDiagramSetup.MainCurrency, UpdateMainDiagramSetupCommandMainCurrency.ALL)
            };

            var response = await serviceClient.DiagramSetupPOSTAsync(command);

            return mapper.Map<PortalMainDiagramSetup>(response);
        }, AuthorizationType.User);
    }

    #endregion


    #region Positions

    public async Task<PagedResult<PortalBudgetPosition>> GetPositionsAsync(
        PaginationRequest paginationRequest)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var response = await serviceClient.PositionGETAsync(
                paginationRequest.Page,
                paginationRequest.PageSize);

            return mapper.Map<PagedResult<PortalBudgetPosition>>(response);
        }, AuthorizationType.User);
    }

    public async Task<PortalBudgetPosition> CreatePositionAsync(
        CreatePositionRequest request)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new CreatePositionCommand()
            {
                Name = request.Name,
                Currency = MappingHelper.MapEnum(
                    request.Currency, CreatePositionCommandCurrency.Unknown),
                Tags = request.Tags,
                OrderPriority = request.OrderPriority
            };

            var response = await serviceClient.PositionPOSTAsync(command);

            return mapper.Map<PortalBudgetPosition>(response);
        }, AuthorizationType.User);
    }

    public async Task<PortalBudgetPosition> UpdatePositionAsync(
        UpdatePositionRequest request)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            UpdatePositionCommandCurrency? currency = request.Currency is null ? null
                : MappingHelper.MapEnum(
                    request.Currency.Value, UpdatePositionCommandCurrency.Unknown);

            var command = new UpdatePositionCommand()
            {
                Id = request.Id,
                Name = request.Name,
                Currency = currency,
                Tags = request.Tags,
                OrderPriority = request.OrderPriority
            };

            var response = await serviceClient.PositionPUTAsync(command);

            return mapper.Map<PortalBudgetPosition>(response);
        }, AuthorizationType.User);
    }

    public async Task<Guid> DeletePositionAsync(
        Guid id)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            return await serviceClient.PositionDELETEAsync(id);
        }, AuthorizationType.User);
    }

    #endregion


    #region BudgetReview

    public async Task<List<PortalBudgetReview>> GetBudgetReviewsByDateRangeAsync(
        DateOnly startDate, DateOnly endDate)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var response = await serviceClient.ByDateRangeAsync(
                startDate,
                endDate);

            return mapper.Map<List<PortalBudgetReview>>(response);
        }, AuthorizationType.User);
    }

    public async Task<PagedResult<PortalBudgetReview>> GetBudgetReviewsAsync(
        PaginationRequest paginationRequest)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var response = await serviceClient.BudgetReviewGETAsync(
                paginationRequest.Page,
                paginationRequest.PageSize);

            return mapper.Map<PagedResult<PortalBudgetReview>>(response);
        }, AuthorizationType.User);
    }

    public async Task<PortalBudgetReview> GetBudgetReviewTemplateAsync(
        DateOnly? date)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var response = await serviceClient.TemplateAsync(date);

            return mapper.Map<PortalBudgetReview>(response);
        }, AuthorizationType.User);
    }

    public async Task<PortalBudgetReview> PublishBudgetReviewAsync(
        PublishBudgetRequestRequest request)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new PublishBudgetReviewCommand()
            {
                Id = request.Id,
                Date = request.Date,
                ReviewedPositions = mapper
                    .Map<List<PositionToPublish>>(request.Positions)
            };

            var response = await serviceClient.BudgetReviewPOSTAsync(command);

            return mapper.Map<PortalBudgetReview>(response);
        }, AuthorizationType.User);
    }

    public async Task<Guid> DeleteBudgetReviewAsync(
        Guid id)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            return await serviceClient.BudgetReviewDELETEAsync(id);
        }, AuthorizationType.User);
    }

    #endregion


    #region Groups

    public async Task<PagedResult<PortalBudgetGroup>> GetBudgetGroupsAsync(
        PaginationRequest paginationRequest)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var response = await serviceClient.GroupGETAsync(
                paginationRequest.Page,
                paginationRequest.PageSize);

            return mapper.Map<PagedResult<PortalBudgetGroup>>(response);
        }, AuthorizationType.User);
    }

    public async Task<PortalBudgetGroup> CreateBudgetGroupAsync(
        CreateBudgetGroupRequest request)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new CreateGroupCommand()
            {
                Name = request.Name,
                IsActive = request.IsActive,
                Tags = request.Tags,
                MainColor = request.MainColor,
                ShowTrendLine = request.ShowTrendLine,
                TrendLineColor = request.TrendLineColor
            };

            var response = await serviceClient.GroupPOSTAsync(command);

            return mapper.Map<PortalBudgetGroup>(response);
        }, AuthorizationType.User);
    }

    public async Task<PortalBudgetGroup> UpdateBudgetGroupAsync(
        UpdateBudgetGroupRequest request)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new UpdateGroupCommand()
            {
                Id = request.Id,
                Name = request.Name,
                IsActive = request.IsActive,
                Tags = request.Tags,
                MainColor = request.MainColor,
                ShowTrendLine = request.ShowTrendLine,
                TrendLineColor = request.TrendLineColor
            };

            var response = await serviceClient.GroupPUTAsync(command);

            return mapper.Map<PortalBudgetGroup>(response);
        }, AuthorizationType.User);
    }

    public async Task<Guid> DeleteBudgetGroupAsync(
        Guid id)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            return await serviceClient.GroupDELETEAsync(id);
        }, AuthorizationType.User);
    }

    #endregion

}
