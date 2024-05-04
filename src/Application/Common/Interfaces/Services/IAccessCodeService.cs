using Defender.Portal.Application.Enums;

namespace Defender.Portal.Application.Common.Interfaces.Services;

public interface IAccessCodeService
{
    Task SendEmailVerificationAccessCodeAsync(Guid? userId);
    Task SendUserUpdateAccessCodeAsync(Guid? userId);
    Task<Guid> SendPasswordResetAccessCodeAsync(string email);
    Task<bool> VerifyAccessCodeAsync(int code, AccessCodeType codeType);
    Task<bool> VerifyEmailAsync(int hash, int code);
}
