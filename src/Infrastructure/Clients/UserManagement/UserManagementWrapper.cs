using AutoMapper;
using Defender.Common.Clients.UserManagement;
using Defender.Common.DB.Pagination;
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
    public async Task<Common.DTOs.UserDto> UpdateUserInfoAsServiceAsync(
        Common.DTOs.UserDto userDto)
    {
        return await UpdateUserInfoAsync(userDto, AuthorizationType.Service);
    }

    public async Task<Common.DTOs.UserDto> UpdateUserInfoAsCurrentUserAsync(
        Common.DTOs.UserDto userDto)
    {
        return await UpdateUserInfoAsync(userDto, AuthorizationType.User);
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

    public async Task<Common.DTOs.UserDto> GetUserInfoByIdAsync(
        Guid userId)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var response = await userManagementServiceClient
                .GetByIdAsync(userId);

            return mapper.Map<Common.DTOs.UserDto>(response);
        }, AuthorizationType.User);
    }

    public async Task<Guid> GetUserIdByEmailAsync(string email)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var response = await userManagementServiceClient
                .GetIdByEmailAsync(email);

            return response;
        }, AuthorizationType.User);
    }

    public async Task<Common.DTOs.UserDto> GetUserInfoByEmailAsync(string email)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var response = await userManagementServiceClient
                .GetByLoginAsync(email);

            return mapper.Map<Common.DTOs.UserDto>(response);
        }, AuthorizationType.User);
    }

    public async Task<PagedResult<Common.DTOs.UserDto>> GetUsersInfoAsync(
        PaginationRequest paginationRequest)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var response = await userManagementServiceClient
                .GetAllAsync(paginationRequest.Page, paginationRequest.PageSize);

            return mapper.Map<PagedResult<Common.DTOs.UserDto>>(response);
        }, AuthorizationType.User);
    }

    private async Task<Common.DTOs.UserDto> UpdateUserInfoAsync(
        Common.DTOs.UserDto userDto, AuthorizationType authorizationType)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new UpdateUserCommand()
            {
                Id = userDto.Id,
                Email = userDto.Email,
                Nickname = userDto.Nickname,
                PhoneNumber = userDto.PhoneNumber,
            };

            var response = await userManagementServiceClient
                .UpdateAsync(command);

            return mapper.Map<Common.DTOs.UserDto>(response);
        }, authorizationType);
    }
}
