using AutoMapper;
using Defender.Common.Clients.Identity;
using Defender.Common.Wrapper;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Clients.Identity;

public class IdentityWrapper : BaseSwaggerWrapper, IIdentityWrapper
{
    private readonly IMapper _mapper;
    private readonly IIdentityAsServiceClient _identityClient;

    public IdentityWrapper(
        IIdentityAsServiceClient identityClient,
        IMapper mapper)
    {
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

            var response = await _identityClient.CreateAsync(command);

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

            var response = await _identityClient.LoginAsync(command);

            return response;
        });
    }
}
