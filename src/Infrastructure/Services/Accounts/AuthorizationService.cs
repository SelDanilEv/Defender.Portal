using AutoMapper;
using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using Defender.Portal.Application.Models.Session;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Services.Accounts;

public class AuthorizationService(
        IIdentityWrapper identityWrapper,
        IMapper mapper) : IAuthorizationService
{
    public async Task<Session> CreateUserAccountAsync(
        string email,
        string nickname, 
        string phone,
        string password)
    {
        var loginResponse = await identityWrapper
            .CreateAccountAsync(email, nickname, phone, password);

        return mapper.Map<Session>(loginResponse);
    }

    public async Task<Session> LoginAccountWithPasswordAsync(
        string login, 
        string password)
    {
        var loginResponse = await identityWrapper
            .LoginAccountAsync(login, password);

        return mapper.Map<Session>(loginResponse);
    }

    public async Task<Session> LoginAccountWithGoogleAsync(string token)
    {
        var loginResponse = await identityWrapper
            .LoginAccountByGoogleTokenAsync(token);

        return mapper.Map<Session>(loginResponse);
    }
}
