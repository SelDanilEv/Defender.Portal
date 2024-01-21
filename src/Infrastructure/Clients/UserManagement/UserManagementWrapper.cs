using AutoMapper;
using Defender.Common.Clients.UserManagement;
using Defender.Common.Interfaces;
using Defender.Common.Wrapper.Internal;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Clients.Identity;

public class UserManagementWrapper : BaseInternalSwaggerWrapper, IUserManagementWrapper
{
    private readonly IMapper _mapper;
    private readonly IUserManagementServiceClient _userManagementServiceClient;

    public UserManagementWrapper(
        IAuthenticationHeaderAccessor authenticationHeaderAccessor,
        IUserManagementServiceClient userManagementServiceClient,
        IMapper mapper) : base(
            userManagementServiceClient,
            authenticationHeaderAccessor)
    {
        _userManagementServiceClient = userManagementServiceClient;
        _mapper = mapper;
    }

    public async Task<Common.DTOs.UserDto> UpdateUserInfoAsync(Common.DTOs.UserDto userDto)
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

            var response = await _userManagementServiceClient.UpdateAsync(command);

            return _mapper.Map<Common.DTOs.UserDto>(response);
        }, AuthorizationType.User);
    }
}
