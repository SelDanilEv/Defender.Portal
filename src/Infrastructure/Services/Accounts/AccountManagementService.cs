using AutoMapper;
using Defender.Common.DTOs;
using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Services.Accounts;

using PublicUserInfoDto = Application.DTOs.Accounts.PublicUserInfoDto;

public class AccountManagementService(
        IIdentityWrapper identityWrapper,
        IUserManagementWrapper userManagementWrapper,
        IMapper mapper) : IAccountManagementService
{
    public async Task<AccountDto> GetAccountDetailsAsync(Guid userId)
    {
        var account = await identityWrapper
            .GetAccountDetailsAsync(userId);

        return account;
    }


    public async Task<PublicUserInfoDto> GetPublicUserInfoAsync(
        Guid userId)
    {
        var publicUserInfo = await userManagementWrapper
            .GetPublicUserInfoAsync(userId);

        return publicUserInfo;
    }

    public async Task<UserDto> UpdateUserInfoAsync(UserDto user)
    {
        var account = await userManagementWrapper
            .UpdateUserInfoAsync(user);

        return account;
    }

    public async Task UpdateUserSentitiveInfoAsync(
        UserDto user, 
        string? newPassword = null)
    {
        if (user.Email != null)
        {
            await userManagementWrapper.UpdateUserInfoAsync(user);
        }

        if (newPassword != null)
        {
            await identityWrapper.ChangeAccountPasswordAsync(
                user.Id,
                newPassword);
        }
    }

}
