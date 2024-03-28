using AutoMapper;
using Defender.Common.Clients.UserManagement;
using Defender.Common.Interfaces;
using Defender.Common.Wrapper.Internal;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Clients.UserManagement;

using PublicUserInfoDto = Application.DTOs.Accounts.PublicUserInfoDto;

public class UserManagementWrapper(
        IAuthenticationHeaderAccessor authenticationHeaderAccessor,
        IUserManagementServiceClient userManagementServiceClient,
        IMapper mapper)
    : BaseInternalSwaggerWrapper(
            userManagementServiceClient,
            authenticationHeaderAccessor),
    IUserManagementWrapper
{
    public async Task<Common.DTOs.UserDto> UpdateUserInfoAsync(
        Common.DTOs.UserDto userDto)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new UpdateUserCommand()
            {
                UserId = userDto.Id,
                Email = userDto.Email,
                Nickname = userDto.Nickname,
                PhoneNumber = userDto.PhoneNumber,
            };

            var response = await userManagementServiceClient
                .UpdateAsync(command);

            return mapper.Map<Common.DTOs.UserDto>(response);
        }, AuthorizationType.User);
    }

    public async Task<PublicUserInfoDto> GetPublicUserInfoAsync(
        Guid userId)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var response = await userManagementServiceClient
                .GetPublicInfoByIdAsync(userId);

            return mapper.Map<PublicUserInfoDto>(response);
        }, AuthorizationType.User);
    }
}
