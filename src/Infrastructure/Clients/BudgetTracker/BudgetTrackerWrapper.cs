﻿using AutoMapper;
using Defender.Common.Clients.BudgetTracker;
using Defender.Common.DB.Pagination;
using Defender.Common.Helpers;
using Defender.Common.Interfaces;
using Defender.Common.Wrapper.Internal;
using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.BudgetTracking.DiagramSetup;
using Defender.Portal.Application.DTOs.BudgetTracking.Positions;
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

    public async Task<PagedResult<PortalPosition>> GetPositionsAsync(
        PaginationRequest paginationRequest)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var response = await serviceClient.PositionGETAsync(
                paginationRequest.Page,
                paginationRequest.PageSize);

            return mapper.Map<PagedResult<PortalPosition>>(response);
        }, AuthorizationType.User);
    }

    public async Task<PortalPosition> CreatePositionAsync(
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

            return mapper.Map<PortalPosition>(response);
        }, AuthorizationType.User);
    }

    public async Task<PortalPosition> UpdatePositionAsync(
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

            return mapper.Map<PortalPosition>(response);
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

}
