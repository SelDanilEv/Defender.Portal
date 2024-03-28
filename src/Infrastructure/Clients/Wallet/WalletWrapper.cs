using AutoMapper;
using Defender.Common.Clients.Wallet;
using Defender.Common.Interfaces;
using Defender.Common.Wrapper.Internal;
using Defender.Portal.Application.DTOs.Wallets;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Clients.Wallet;

public class WalletWrapper(
    IAuthenticationHeaderAccessor authenticationHeaderAccessor,
    IWalletServiceClient serviceClient,
    IMapper mapper
    ) : BaseInternalSwaggerWrapper(
            serviceClient,
            authenticationHeaderAccessor
        ), IWalletWrapper
{

    public async Task<WalletDto> GetWalletInfoAsync()
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new GetOrCreateWalletCommand();

            var response = await serviceClient.GetOrCreateAsync(command);

            return response;
        }, AuthorizationType.User);
    }

    public async Task<WalletDto> CreateNewAccountAsync(
        Currency currency,
        bool isDefault)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new AddCurrencyAccountCommand()
            {
                Currency = currency,
                IsDefault = isDefault
            };

            var response = await serviceClient.CreateAsync(command);

            return response;
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

    public async Task<PortalTransactionDto> StartTransferTransactionAsync(
        int walletNumber,
        int amount, 
        Currency currency)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new StartTransferTransactionCommand()
            {
                ToWalletNumber = walletNumber,
                Amount = amount,
                Currency = currency
            };

            var response = await serviceClient
                .TransferAsync(command);

            return mapper.Map<PortalTransactionDto>(response);
        }, AuthorizationType.User);
    }
}
