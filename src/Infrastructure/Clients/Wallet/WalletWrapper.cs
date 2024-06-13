using AutoMapper;
using Defender.Common.Clients.Wallet;
using Defender.Common.DB.Pagination;
using Defender.Common.Helpers;
using Defender.Common.Interfaces;
using Defender.Common.Wrapper.Internal;
using Defender.Portal.Application.Common.Interfaces.Wrappers;
using Defender.Portal.Application.DTOs.Banking;

namespace Defender.Portal.Infrastructure.Clients.Wallet;

using Currency = Application.Enums.Currency;

public class WalletWrapper(
    IAuthenticationHeaderAccessor authenticationHeaderAccessor,
    IWalletServiceClient serviceClient,
    IMapper mapper
    ) : BaseInternalSwaggerWrapper(
            serviceClient,
            authenticationHeaderAccessor
        ), IWalletWrapper
{

    public async Task<PortalWalletInfoDto> GetWalletInfoAsync(Guid? userId = null)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var response = await serviceClient.GetOrCreateAsync(userId);

            return mapper.Map<PortalWalletInfoDto>(response);
        }, AuthorizationType.User);
    }

    public async Task<PortalWalletInfoDto> CreateNewAccountAsync(
        Currency currency,
        bool isDefault)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new AddCurrencyAccountCommand()
            {
                Currency = MappingHelper.MapEnum(currency, AddCurrencyAccountCommandCurrency.Unknown),
                IsDefault = isDefault
            };

            var response = await serviceClient.CreateAsync(command);

            return mapper.Map<PortalWalletInfoDto>(response); ;
        }, AuthorizationType.User);
    }

    public async Task<PublicPortalWalletInfoDto> GetPublicWalletInfoByNumberAsync(
        int walletNumber)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var response = await serviceClient
                .InfoByNumberAsync(walletNumber);

            return mapper.Map<PublicPortalWalletInfoDto>(response);
        }, AuthorizationType.User);
    }

    public async Task<PortalWalletInfoDto> GetWalletInfoByNumberAsync(
        int walletNumber)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var response = await serviceClient
                .InfoByNumber2Async(walletNumber);

            return mapper.Map<PortalWalletInfoDto>(response);
        }, AuthorizationType.User);
    }

    public async Task<PortalTransactionDto> StartTransferTransactionAsync(
        int walletNumber,
        int amount,
        Currency currency)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new StartTransferTransactionCommand()
            {
                TargetWalletNumber = walletNumber,
                Amount = amount,
                Currency = MappingHelper.MapEnum
                    (currency, StartTransferTransactionCommandCurrency.Unknown)
            };

            var response = await serviceClient
                .TransferAsync(command);

            return mapper.Map<PortalTransactionDto>(response);
        }, AuthorizationType.User);
    }

    public async Task<PortalTransactionDto> StartRechargeTransactionAsync(
        int walletNumber,
        int amount,
        Currency currency)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new StartRechargeTransactionCommand()
            {
                TargetWalletNumber = walletNumber,
                Amount = amount,
                Currency = MappingHelper.MapEnum
                    (currency, StartRechargeTransactionCommandCurrency.Unknown)
            };

            var response = await serviceClient
                .RechargeAsync(command);

            return mapper.Map<PortalTransactionDto>(response);
        }, AuthorizationType.User);
    }

    public async Task<PagedResult<PortalTransactionDto>> GetTransactionHistoryAsync(
        PaginationRequest paginationRequest,
        Guid? walletId = null)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var response = await serviceClient
                .HistoryAsync(
                    walletId,
                    paginationRequest.Page,
            paginationRequest.PageSize);

            return mapper.Map<PagedResult<PortalTransactionDto>>(response);
        }, AuthorizationType.User);
    }

}
