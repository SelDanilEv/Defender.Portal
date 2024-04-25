using Defender.Portal.Application.DTOs.Auth;

namespace Defender.Portal.Application.Common.Interfaces.Services.Accounts;

public interface IAuthorizationService
{
    public Task<SessionDto> LoginAccountWithPasswordAsync(string login, string password);
    public Task<SessionDto> LoginAccountWithGoogleAsync(string token);
    public Task<SessionDto> CreateUserAccountAsync(string email, string nickname, string phone, string password);
}
