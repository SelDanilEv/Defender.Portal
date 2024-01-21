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

            var response = await _identityServiceClient.Email2Async(command);

            return response;
        }, AuthorizationType.User);
    }

    public async Task SendVerificationCodeAsync(Guid accountId, AccessCodeType accessCodeType)
    {
        await ExecuteSafelyAsync(async () =>
        {
            var command = new SendVerificationCodeCommand()
            {
                UserId = accountId,
                Type = accessCodeType
            };

            await _identityServiceClient.EmailAsync(command);
        }, AuthorizationType.Service);
    }

    public async Task<bool> VerifyAccessCodeAsync(int code)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new VerifyCodeCommand()
            {
                Code = code,
            };

            var response = await _identityServiceClient.VerifyAsync(command);

            return response;
        }, AuthorizationType.User);
    }

    public async Task ChangeAccountPasswordAsync(Guid accountId, string newPassword)
    {
        await ExecuteSafelyAsync(async () =>
        {
            var command = new ChangeUserPasswordCommand()
            {
                AccountId = accountId,
                NewPassword = newPassword
            };

            await _identityServiceClient.ChangeAsync(command);
        }, AuthorizationType.User);
    }
}
