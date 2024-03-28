using Defender.Common.DTOs;

namespace Defender.Portal.Infrastructure.Clients.Interfaces;

using PublicUserInfoDto = Application.DTOs.Accounts.PublicUserInfoDto;

public interface IUserManagementWrapper
{
    Task<UserDto> UpdateUserInfoAsync(UserDto userDto);
    Task<PublicUserInfoDto> GetPublicUserInfoAsync(Guid userId);

}
