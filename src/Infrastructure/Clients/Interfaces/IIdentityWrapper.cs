using Defender.Portal.Application.DTOs.Auth;
using Defender.Portal.Application.Enums;
using Defender.Portal.Application.Models.ApiRequests;

namespace Defender.Portal.Infrastructure.Clients.Interfaces;

public interface IIdentityWrapper
{
    Task<SessionDto> LoginAccountAsync(string login, string password);
    Task<SessionDto> LoginAccountAsAdminAsync(Guid userId);
    Task<SessionDto> LoginAccountByGoogleTokenAsync(string token);
    Task<SessionDto> CreateAccountAsync(string email, string nickname, string phone, string password);
    Task<bool> VerifyAccountEmailAsync(int hash, int code);
    Task SendVerificationCodeAsync(Guid accountId, AccessCodeType accessCodeType);
    Task<Common.DTOs.AccountDto> GetAccountDetailsAsync(Guid accountId);
    Task<bool> VerifyAccessCodeAsync(int code);
    Task ChangeAccountPasswordAsync(Guid accountId, string newPassword);
    Task<Common.DTOs.AccountDto> UpdateAccountInfoAsync(UpdateAccountInfoRequest request);
}
