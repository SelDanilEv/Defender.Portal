using Defender.Common.DTOs;

namespace Defender.Portal.Application.Common.Interfaces;

public interface IAccountManagementService
{
    /// <summary>
    /// Get account info
    /// </summary>
    /// <param name="userId">User id</param>
    /// <returns></returns>
    public Task<AccountDto> GetAccountDetails(Guid userId);

}
