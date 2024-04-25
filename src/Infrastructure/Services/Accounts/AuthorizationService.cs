using AutoMapper;
using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using Defender.Portal.Application.DTOs.Auth;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Services.Accounts;

public class AuthorizationService(
        IIdentityWrapper identityWrapper) 
    : IAuthorizationService
{
    public async Task<SessionDto> CreateUserAccountAsync(
        string email,
        string nickname, 
        string phone,
        string password)
    {
        var loginResponse = await identityWrapper
            .CreateAccountAsync(email, nickname, phone, password);

        return loginResponse;
    }

    public async Task<SessionDto> LoginAccountWithPasswordAsync(
        string login, 
        string password)
    {
        var loginResponse = await identityWrapper
            .LoginAccountAsync(login, password);

        return loginResponse;
    }

    public async Task<SessionDto> LoginAccountWithGoogleAsync(string token)
    {
        var loginResponse = await identityWrapper
            .LoginAccountByGoogleTokenAsync(token);

        return loginResponse;
    }
}
