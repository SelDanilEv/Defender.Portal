using AutoMapper;
using Defender.Common.Clients.Identity;
using Defender.Common.Helpers;
using Defender.Common.Interfaces;
using Defender.Common.Wrapper.Internal;
using Defender.Portal.Application.DTOs.Auth;
using Defender.Portal.Application.Enums;
using Defender.Portal.Application.Models.ApiRequests;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Clients.Identity;

public class IdentityWrapper(
        IAuthenticationHeaderAccessor authenticationHeaderAccessor,
        IIdentityServiceClient identityServiceClient,
        IMapper mapper)
    : BaseInternalSwaggerWrapper(
            identityServiceClient,
            authenticationHeaderAccessor),
    IIdentityWrapper
{
    public async Task<SessionDto> CreateAccountAsync(
        string email,
        string nickname,
        string phone,
        string password)
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

            var response = await identityServiceClient.CreateAsync(command);

            return mapper.Map<SessionDto>(response);
        }, AuthorizationType.Service);
    }

    public async Task<SessionDto> LoginAccountAsync(string login, string password)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new LoginWithPasswordCommand()
            {
                Login = login,
                Password = password,
            };

            var response = await identityServiceClient.LoginAsync(command);

            return mapper.Map<SessionDto>(response);
        }, AuthorizationType.Service);
    }

    public async Task<SessionDto> LoginAccountAsAdminAsync(Guid userId)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new LoginAsAdminCommand()
            {
                UserId = userId
            };

            var response = await identityServiceClient.LoginAsAdminAsync(command);

            return mapper.Map<SessionDto>(response);
        }, AuthorizationType.User);
    }

    public async Task<SessionDto> LoginAccountByGoogleTokenAsync(string token)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new LoginGoogleCommand()
            {
                Token = token
            };

            var response = await identityServiceClient.GoogleAsync(command);

            return mapper.Map<SessionDto>(response);
        }, AuthorizationType.Service);
    }

    public async Task<Common.DTOs.AccountDto> GetAccountDetailsAsync(Guid accountId)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var response = await identityServiceClient.DetailsAsync(accountId);

            return mapper.Map<Common.DTOs.AccountDto>(response);
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

            var response = await identityServiceClient.Email2Async(command);

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
                Type = MappingHelper.MapEnum<
                    AccessCodeType,
                    SendVerificationCodeCommandType>(
                        accessCodeType)
            };

            await identityServiceClient.EmailAsync(command);
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

            var response = await identityServiceClient.VerifyAsync(command);

            return response;
        }, AuthorizationType.User);
    }

    public async Task ChangeAccountPasswordAsync(
        Guid accountId,
        string newPassword)
    {
        await ExecuteSafelyAsync(async () =>
        {
            var command = new ChangeUserPasswordCommand()
            {
                AccountId = accountId,
                NewPassword = newPassword
            };

            await identityServiceClient.ChangeAsync(command);
        }, AuthorizationType.Service);
    }

    public async Task<Common.DTOs.AccountDto> UpdateAccountInfoAsync(
        UpdateAccountInfoRequest updateRequest)
    {
        return await ExecuteSafelyAsync(async () =>
        {
            var command = new UpdateAccountCommand()
            {
                Id = updateRequest.UserId,
                IsPhoneVerified = updateRequest.IsPhoneVerified,
                IsEmailVerified = updateRequest.IsEmailVerified,
                IsBlocked = updateRequest.IsBlocked,
            };

            if (updateRequest.Role.HasValue)
            {
                command.Role = MappingHelper.MapEnum<
                    Common.Enums.Role,
                    UpdateAccountCommandRole>(
                        updateRequest.Role.Value);
            }

            var response = await identityServiceClient.UpdateAsync(command);

            return mapper.Map<Common.DTOs.AccountDto>(response);
        }, AuthorizationType.User);
    }
}
