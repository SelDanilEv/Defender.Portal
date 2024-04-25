using Defender.Common.DTOs;

namespace Defender.Portal.Application.Common.Interfaces.Services.Accounts;

using PublicUserInfoDto = DTOs.Accounts.PublicUserInfoDto;

public interface IAccountManagementService
{
    public Task<AccountDto> GetAccountDetailsAsync(Guid userId);

    Task<PublicUserInfoDto> GetPublicUserInfoAsync(Guid userId);

    Task<UserDto> UpdateUserInfoAsync(UserDto user);

    Task UpdateUserSentitiveInfoAsync(UserDto user, string? newPassword = null);
}
