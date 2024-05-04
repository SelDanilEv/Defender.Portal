using Defender.Common.DTOs;
using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Services.Accounts;

using PublicUserInfoDto = Application.DTOs.Accounts.PublicUserInfoDto;

public class AccountManagementService(
        IIdentityWrapper identityWrapper,
        IUserManagementWrapper userManagementWrapper) 
    : IAccountManagementService
{
    public async Task<AccountDto> GetAccountDetailsAsync(Guid userId)
    {
        var account = await identityWrapper
            .GetAccountDetailsAsync(userId);

        return account;
    }

    public async Task<Guid> GetUserIdByEmailAsync(string email)
    {
        var userId = await userManagementWrapper
            .GetUserIdByEmailAsync(email);

        return userId;
    }

    public async Task<PublicUserInfoDto> GetPublicUserInfoAsync(
        Guid userId)
    {
        var publicUserInfo = await userManagementWrapper
            .GetPublicUserInfoAsync(userId);

        return publicUserInfo;
    }

    public async Task<UserDto> UpdateUserInfoAsCurrentUserAsync(UserDto user)
    {
        var account = await userManagementWrapper
            .UpdateUserInfoAsCurrentUserAsync(user);

        return account;
    }

    public async Task UpdateUserSensitiveInfoAsync(
        UserDto user,
        string? newPassword = null)
    {
        if (user.Email != null)
        {
            await userManagementWrapper.UpdateUserInfoAsServiceAsync(user);
        }

        if (newPassword != null)
        {
            await ChangeAccountPasswordAsync(
                user.Id,
                newPassword);
        }
    }

    public async Task ChangeAccountPasswordAsync(
        Guid? userId,
        string? newPassword,
        int? code = null)
    {
            await identityWrapper.ChangeAccountPasswordAsync(
                userId,
                newPassword,
                code);
    }

}
