using AutoMapper;
using Defender.Common.Clients.Identity;
using Defender.Common.Interfaces;
using Defender.Common.Wrapper.Internal;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Clients.Identity;

public class IdentityWrapper : BaseInternalSwaggerWrapper, IIdentityWrapper
{
    private readonly IMapper _mapper;
    private readonly IIdentityServiceClient _identityServiceClient;

    public IdentityWrapper(
        IAuthenticationHeaderAccessor authenticationHeaderAccessor,
        IIdentityServiceClient identityClient,
        IMapper mapper) : base(
            identityClient,
            authenticationHeaderAccessor)
    {
        _identityServiceClient = identityClient;
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

            var response = await _identityServiceClient.CreateAsync(command);

            return response;
        }, AuthorizationType.Service);
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

            var response = await _identityServiceClient.LoginAsync(command);

            return response;
        }, AuthorizationType.Service);
    }

    public async Task<LoginResponse> LoginAccountByGoogleTokenAsync(string token)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new LoginGoogleCommand()
            {
                Token = token
            };

            var response = await _identityServiceClient.GoogleAsync(command);

            return response;
        }, AuthorizationType.Service);
    }

    public async Task<AccountDto> GetAccountDetailsAsUserAsync(Guid accountId)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var response = await _identityServiceClient.DetailsAsync(accountId);

            return response;
        }, AuthorizationType.User);
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

            var response = await _identityServiceClient.EmailAsync(command);

            return response;
        }, AuthorizationType.User);
    }

    public async Task SendVerificationEmailAsync(Guid accountId)
    {
        await ExecuteSafelyAsync(async () =>
        {
            var command = new SendEmailVerificationCommand()
            {
                UserId = accountId,
            };

            await _identityServiceClient.SendVerificationEmailAsync(command);
        }, AuthorizationType.User);
    }
}
