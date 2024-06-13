using Defender.Common.DB.Pagination;
using Defender.Common.DTOs;
using Defender.Portal.Application.DTOs.Auth;
using Defender.Portal.Application.Models.ApiRequests.Accounts;

namespace Defender.Portal.Application.Common.Interfaces.Services.Admin;

public interface IAdminAccountManagementService
{
    Task<SessionDto> LoginAccountAsAdminAsync(Guid userId);
    Task<AccountDto> GetAccountInfoByIdAsync(Guid userId);
    Task<UserDto> GetUserInfoByIdAsync(Guid userId);
    Task<UserDto> GetUserInfoByEmailAsync(string email);
    Task<PagedResult<UserDto>> GetUsersInfoAsync(PaginationRequest paginationRequest);
    Task<AccountDto> UpdateAccountInfoAsync(UpdateAccountInfoAsAdminRequest account);
    Task UpdateAccountPasswordAsync(Guid userId, string newPassword);
}
