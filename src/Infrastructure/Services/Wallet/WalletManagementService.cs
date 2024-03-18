using AutoMapper;
using Defender.Common.Clients.Wallet;
using Defender.Portal.Application.Common.Interfaces.Services.Wallet;
using Defender.Portal.Application.DTOs.Wallet;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Services.Wallet;

public class WalletManagementService : IWalletManagementService
{
    private readonly IWalletWrapper _walletWrapper;
    private readonly IMapper _mapper;

    public WalletManagementService(
        IWalletWrapper walletWrapper,
        IMapper mapper)
    {
        _walletWrapper = walletWrapper;
        _mapper = mapper;
    }

    public async Task<PortalWalletInfoDto> GetCurrentWalletInfoAsync()
    {
        var wallet = await _walletWrapper.GetWalletInfoAsync();

        return _mapper.Map<PortalWalletInfoDto>(wallet);
    }

    public async Task<PortalWalletInfoDto> CreateNewAccountAsync(
        Currency currency,
        bool isDefault = false)
    {
        var wallet = await _walletWrapper
            .CreateNewAccountAsync(currency, isDefault);

        return _mapper.Map<PortalWalletInfoDto>(wallet);
    }
}
