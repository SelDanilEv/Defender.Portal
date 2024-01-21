using Defender.Common.DTOs;

namespace Defender.Portal.Infrastructure.Clients.Interfaces;

public interface IUserManagementWrapper
{
    public Task<UserDto> UpdateUserInfoAsync(UserDto userDto);

}
