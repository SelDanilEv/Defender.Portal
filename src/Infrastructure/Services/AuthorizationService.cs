using AutoMapper;
using Defender.Portal.Application.Common.Interfaces;
using Defender.Portal.Application.Models.Session;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Services;

public class AuthorizationService : IAuthorizationService
{
    private readonly IIdentityWrapper _identityWrapper;
    private readonly IMapper _mapper;

    public AuthorizationService(
        IIdentityWrapper identityWrapper,
        IMapper mapper)
    {
        _identityWrapper = identityWrapper;
        _mapper = mapper;
    }

    public async Task<Session> CreateUserAccountAsync(string email, string nickname, string phone, string password)
    {
        var loginResponse = await _identityWrapper.CreateAccountAsync(email, nickname, phone, password);

        return _mapper.Map<Session>(loginResponse);
    }

    public async Task<Session> LoginAccountWithPasswordAsync(string login, string password)
    {
        var loginResponse = await _identityWrapper.LoginAccountAsync(login, password);

        return _mapper.Map<Session>(loginResponse);
    }

    public async Task<bool> VerifyEmailAsync(int hash, int code)
    {
        return await _identityWrapper.VerifyAccountEmailAsync(hash, code);
    }

    public async Task SendVerificationEmailAsync(Guid accountId)
    {
        await _identityWrapper.SendVerificationEmailAsync(accountId);
    }
}
