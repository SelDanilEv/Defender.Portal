using Defender.Portal.Infrastructure.Clients.Identity.Generated;

namespace Defender.Portal.Infrastructure.Clients.Interfaces;
public interface IIdentityWrapper
{
    public Task<LoginResponse> LoginAccountAsync(string login, string password);
    public Task<LoginResponse> CreateAccountAsync(string email, string nickname, string phone, string password);

}
