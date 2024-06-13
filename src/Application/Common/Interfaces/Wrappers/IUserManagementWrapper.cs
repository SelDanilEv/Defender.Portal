using Defender.Common.DB.Pagination;
using Defender.Common.DTOs;

namespace Defender.Portal.Application.Common.Interfaces.Wrappers;

using PublicUserInfoDto = DTOs.Accounts.PublicUserInfoDto;

public interface IUserManagementWrapper
{
    Task<UserDto> UpdateUserInfoAsServiceAsync(UserDto userDto);
    Task<UserDto> UpdateUserInfoAsCurrentUserAsync(UserDto userDto);
    Task<Guid> GetUserIdByEmailAsync(string email);
    Task<PublicUserInfoDto> GetPublicUserInfoAsync(Guid userId);
    Task<UserDto> GetUserInfoByIdAsync(Guid userId);
    Task<UserDto> GetUserInfoByEmailAsync(string email);
    Task<PagedResult<UserDto>> GetUsersInfoAsync(
        PaginationRequest paginationRequest);
}
