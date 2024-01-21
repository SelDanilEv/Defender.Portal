using Defender.Common.DTOs;
using Defender.Portal.Application.DTOs;
using Defender.Portal.Application.Modules.Authorization.Commands;

namespace Defender.Portal.Application.Common.Interfaces;

public interface IAccountManagementService
{
    public Task<AccountDto> GetAccountDetailsAsync(Guid userId);

    Task<UserDto> UpdateUserInfoAsync(UpdateAccountCommand updateAccountCommand);

    Task UpdateUserSentitiveInfoAsync(UpdateAccountSentitiveInfoCommand command);

}
