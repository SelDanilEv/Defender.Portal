using AutoMapper;
using Defender.Common.Clients.Identity;
using Defender.Common.Wrapper;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Clients.Identity;

public class IdentityWrapper : BaseSwaggerWrapper, IIdentityWrapper
{
    private readonly IMapper _mapper;
    private readonly IIdentityAsServiceClient _identityAsServiceClient;
    private readonly IIdentityClient _identityClient;

    public IdentityWrapper(
        IIdentityAsServiceClient identityAsServiceClient,
        IIdentityClient identityClient,
        IMapper mapper)
    {
        _identityAsServiceClient = identityAsServiceClient;
        _identityClient = identityClient;
        _mapper = mapper;
    }

    public async Task<LoginResponse> CreateAccountAsync(string email, string nickname, string phone, string password)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new CreateAccountCommand()
            {
                Email = email,
                Nickname = nickname,
                PhoneNumber = phone,
                Password = password,
            };

            var response = await _identityAsServiceClient.CreateAsync(command);

            return response;
        });
    }

    public async Task<LoginResponse> LoginAccountAsync(string login, string password)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new LoginWithPasswordCommand()
            {
                Login = login,
                Password = password,
            };

            var response = await _identityAsServiceClient.LoginAsync(command);

            return response;
        });
    }

    public async Task<AccountDto> GetAccountDetailsAsUserAsync(Guid accountId)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var response = await _identityClient.DetailsAsync(accountId);

            return response;
        });
    }

    public async Task<bool> VerifyAccountEmailAsync(int hash, int code)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new VerifyEmailCommand()
            {
                Hash = hash,
                Code = code,
            };

            var response = await _identityClient.EmailAsync(command);

            return response;
        });
    }

    public async Task SendVerificationEmailAsync(Guid accountId)
    {
        await ExecuteSafelyAsync(async () =>
        {
            var command = new SendEmailVerificationCommand()
            {
                UserId = accountId,
            };

            await _identityClient.SendVerificationEmailAsync(command);
        });
    }
}
