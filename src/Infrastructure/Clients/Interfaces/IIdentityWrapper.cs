using Defender.Common.Clients.Identity;

namespace Defender.Portal.Infrastructure.Clients.Interfaces;

public interface IIdentityWrapper
{
    Task<LoginResponse> LoginAccountAsync(string login, string password);
    Task<LoginResponse> LoginAccountByGoogleTokenAsync(string token);
    Task<LoginResponse> CreateAccountAsync(string email, string nickname, string phone, string password);
    Task<bool> VerifyAccountEmailAsync(int hash, int code);
    Task SendVerificationCodeAsync(Guid accountId, AccessCodeType accessCodeType);
    Task<AccountDto> GetAccountDetailsAsUserAsync(Guid accountId);
    Task<bool> VerifyAccessCodeAsync(int code);
    Task ChangeAccountPasswordAsync(Guid accountId, string newPassword);
}
