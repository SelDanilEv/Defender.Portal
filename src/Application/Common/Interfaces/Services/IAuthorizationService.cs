using Defender.Portal.Application.Models.Session;

namespace Defender.Portal.Application.Common.Interfaces;

public interface IAuthorizationService
{
    public Task<Session> LoginAccountWithPasswordAsync(string login, string password);
    public Task<Session> CreateUserAccountAsync(string email, string nickname, string phone, string password);
    public Task<bool> VerifyEmailAsync(int hash, int code);
    public Task SendVerificationEmailAsync(Guid accountId);
}
