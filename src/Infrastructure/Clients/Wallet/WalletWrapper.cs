using AutoMapper;
using Defender.Common.Clients.Wallet;
using Defender.Common.Interfaces;
using Defender.Common.Wrapper.Internal;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Clients.Wallet;

public class WalletWrapper : BaseInternalSwaggerWrapper, IWalletWrapper
{
    private readonly IMapper _mapper;
    private readonly IWalletServiceClient _serviceClient;

    public WalletWrapper(
        IAuthenticationHeaderAccessor authenticationHeaderAccessor,
        IWalletServiceClient serviceClient,
        IMapper mapper) : base(
            serviceClient,
            authenticationHeaderAccessor)
    {
        _serviceClient = serviceClient;
        _mapper = mapper;
    }

    public async Task<WalletDto> GetWalletInfoAsync()
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new GetOrCreateWalletCommand();

            var response = await _serviceClient.GetOrCreateAsync(command);

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

            var response = await _serviceClient.CreateAsync(command);

            return response;
        }, AuthorizationType.User);
    }

}
