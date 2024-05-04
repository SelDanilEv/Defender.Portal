using Defender.Common.DTOs;

namespace Defender.Portal.Application.Common.Interfaces.Services.Accounts;

using PublicUserInfoDto = DTOs.Accounts.PublicUserInfoDto;

public interface IAccountManagementService
{
    public Task<AccountDto> GetAccountDetailsAsync(Guid userId);
    Task<Guid> GetUserIdByEmailAsync(string email);
    Task<PublicUserInfoDto> GetPublicUserInfoAsync(Guid userId);
    Task<UserDto> UpdateUserInfoAsCurrentUserAsync(UserDto user);
    Task UpdateUserSensitiveInfoAsync(UserDto userDto, string? newPassword = null);
    Task ChangeAccountPasswordAsync(Guid? userId, string? newPassword, int? code = null);
}
