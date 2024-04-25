using AutoMapper;
using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces.Services;
using Defender.Portal.Application.Enums;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Services;

public class AccessCodeService(
        IIdentityWrapper identityWrapper,
        ICurrentAccountAccessor currentAccountAccessor,
        IMapper mapper) : IAccessCodeService
{

    public async Task<bool> VerifyEmailAsync(int hash, int code)
    {
        return await identityWrapper.VerifyAccountEmailAsync(hash, code);
    }

    public async Task<bool> VerifyAccessCodeAsync(int code)
    {
        return await identityWrapper.VerifyAccessCodeAsync(code);
    }

    public async Task SendEmailVerificationAccessCodeAsync(Guid? userId)
    {
        await SendAccessCodeAsync(userId, AccessCodeType.EmailVerification);
    }

    public async Task SendUserUpdateAccessCodeAsync(Guid? userId)
    {
        await SendAccessCodeAsync(userId, AccessCodeType.UpdateAccount);
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
