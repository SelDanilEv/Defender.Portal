using AutoMapper;
using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces.Services;
using Defender.Portal.Application.Enums;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Services;

public class AccessCodeService(
        IIdentityWrapper identityWrapper,
        ICurrentAccountAccessor currentAccountAccessor) : IAccessCodeService
{

    public async Task<bool> VerifyEmailAsync(int hash, int code)
    {
        return await identityWrapper.VerifyAccountEmailAsync(hash, code);
    }

    public async Task<bool> VerifyAccessCodeAsync(int code, AccessCodeType codeType)
    {
        return await identityWrapper.VerifyAccessCodeAsync(code, codeType);
    }

    public async Task SendEmailVerificationAccessCodeAsync(Guid? userId)
    {
        await SendAccessCodeAsync(userId, AccessCodeType.EmailVerification);
    }

    public async Task SendUserUpdateAccessCodeAsync(Guid? userId)
    {
        await SendAccessCodeAsync(userId, AccessCodeType.UpdateAccount);
    }

    public async Task<Guid> SendPasswordResetAccessCodeAsync(string email)
    {
        return await identityWrapper.SendResetPasswordCodeAsync(email);
    }

    private async Task SendAccessCodeAsync(
        Guid? userId,
        AccessCodeType accessCodeType)
    {
        var accountId = userId.HasValue 
            ? userId.Value 
            : currentAccountAccessor.GetAccountId();

        await identityWrapper.SendVerificationCodeAsync(
            accountId, accessCodeType);
    }
}
