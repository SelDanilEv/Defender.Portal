using Defender.Common.DB.Pagination;
using Defender.Common.DTOs;
using Defender.Portal.Application.Common.Interfaces.Services.Admin;
using Defender.Portal.Application.DTOs.Auth;
using Defender.Portal.Application.Models.ApiRequests;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Services.Accounts;

public class AdminAccountManagementService(
        IIdentityWrapper identityWrapper,
        IUserManagementWrapper userManagementWrapper) : IAdminAccountManagementService
{
    public async Task<SessionDto> LoginAccountAsAdminAsync(Guid userId)
    {
        var session = await identityWrapper
            .LoginAccountAsAdminAsync(userId);

        return session;
    }

    public async Task<AccountDto> GetAccountInfoByIdAsync(Guid userId)
    {
        var account = await identityWrapper
            .GetAccountDetailsAsync(userId);

        return account;
    }

    public async Task<UserDto> GetUserInfoByIdAsync(Guid userId)
    {
        var user = await userManagementWrapper
            .GetUserInfoByIdAsync(userId);

        return user;
    }

    public async Task<UserDto> GetUserInfoByEmailAsync(string email)
    {
        var user = await userManagementWrapper
            .GetUserInfoByEmailAsync(email);

        return user;
    }

    public async Task<PagedResult<UserDto>> GetUsersInfoAsync(
        PaginationRequest paginationRequest)
    {
        var users = await userManagementWrapper
            .GetUsersInfoAsync(paginationRequest);

        return users;
    }

    public async Task<AccountDto> UpdateAccountInfoAsync(
        UpdateAccountInfoRequest request)
    {
        return await identityWrapper.UpdateAccountInfoAsync(request);
    }

    public async Task UpdateAccountPasswordAsync(
        Guid userId, string newPassword)
    {
        await identityWrapper.ChangeAccountPasswordAsync(userId, newPassword);
    }
}
