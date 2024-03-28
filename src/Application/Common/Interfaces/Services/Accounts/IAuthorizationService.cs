using Defender.Portal.Application.Models.Session;

namespace Defender.Portal.Application.Common.Interfaces.Services.Accounts;

public interface IAuthorizationService
{
    public Task<Session> LoginAccountWithPasswordAsync(string login, string password);
    public Task<Session> LoginAccountWithGoogleAsync(string token);
    public Task<Session> CreateUserAccountAsync(string email, string nickname, string phone, string password);
}
