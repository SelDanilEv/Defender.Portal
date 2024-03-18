using AutoMapper;
using Defender.Common.DTOs;
using Defender.Portal.Application.Common.Interfaces.Services;
using Defender.Portal.Application.Modules.Authorization.Commands;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Services;

public class AccountManagementService : IAccountManagementService
{
    private readonly IIdentityWrapper _identityWrapper;
    private readonly IUserManagementWrapper _userManagementWrapper;
    private readonly IMapper _mapper;

    public AccountManagementService(
        IIdentityWrapper identityWrapper,
        IUserManagementWrapper userManagementWrapper,
        IMapper mapper)
    {
        _identityWrapper = identityWrapper;
        _userManagementWrapper = userManagementWrapper;
        _mapper = mapper;
    }

    public async Task<AccountDto> GetAccountDetailsAsync(Guid userId)
    {
        var account = await _identityWrapper.GetAccountDetailsAsUserAsync(userId);

        return _mapper.Map<AccountDto>(account);
    }

    public async Task<UserDto> UpdateUserInfoAsync(UpdateAccountCommand updateAccountCommand)
    {
        var account = await _userManagementWrapper
            .UpdateUserInfoAsync(
                updateAccountCommand.ToUserInfo());

        return account;
    }

    public async Task UpdateUserSentitiveInfoAsync(UpdateAccountSentitiveInfoCommand command)
    {
        if (command.Email != null)
        {
            await _userManagementWrapper.UpdateUserInfoAsync(
                command.ToUserInfo());
        }

        if (command.NewPassword != null)
        {
            await _identityWrapper.ChangeAccountPasswordAsync(
                command.UserId.Value,
                command.NewPassword);
        }
    }
}
