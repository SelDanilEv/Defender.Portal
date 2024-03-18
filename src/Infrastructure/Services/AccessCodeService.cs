﻿using AutoMapper;
using Defender.Common.Accessors;
using Defender.Common.Clients.Identity;
using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces.Services;
using Defender.Portal.Infrastructure.Clients.Interfaces;

namespace Defender.Portal.Infrastructure.Services;

public class AccessCodeService : IAccessCodeService
{
    private readonly IIdentityWrapper _identityWrapper;
    private readonly ICurrentAccountAccessor _currentAccountAccessor;
    private readonly IMapper _mapper;

    public AccessCodeService(
        IIdentityWrapper identityWrapper,
        ICurrentAccountAccessor currentAccountAccessor,
        IMapper mapper)
    {
        _identityWrapper = identityWrapper;
        _currentAccountAccessor = currentAccountAccessor;
        _mapper = mapper;
    }

    public async Task<bool> VerifyEmailAsync(int hash, int code)
    {
        return await _identityWrapper.VerifyAccountEmailAsync(hash, code);
    }

    public async Task<bool> VerifyAccessCodeAsync(int code)
    {
        return await _identityWrapper.VerifyAccessCodeAsync(code);
    }

    public async Task SendEmailVerificationAccessCodeAsync(Guid? userId)
    {
        await SendAccessCodeAsync(userId, AccessCodeType.EmailVerification);
    }

    public async Task SendUserUpdateAccessCodeAsync(Guid? userId)
    {
        await SendAccessCodeAsync(userId, AccessCodeType.UpdateAccount);
    }

    private async Task SendAccessCodeAsync(Guid? userId, AccessCodeType accessCodeType)
    {
        var accountId = userId.HasValue ? userId.Value : _currentAccountAccessor.GetAccountId();

        await _identityWrapper.SendVerificationCodeAsync(accountId, accessCodeType);
    }
}
