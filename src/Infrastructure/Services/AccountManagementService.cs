using AutoMapper;
using Defender.Portal.Application.Common.Interfaces;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Services;

public class AccountManagementService : IAccountManagementService
{
    private readonly IIdentityWrapper _identityWrapper;
    private readonly IMapper _mapper;

    public AccountManagementService(
        IIdentityWrapper identityWrapper,
        IMapper mapper)
    {
        _identityWrapper = identityWrapper;
        _mapper = mapper;
    }

    public async Task<Common.DTOs.AccountDto> GetAccountDetails(Guid userId)
    {
        var account = await _identityWrapper.GetAccountDetailsAsUserAsync(userId);

        return _mapper.Map<Common.DTOs.AccountDto>(account);
    }
}
