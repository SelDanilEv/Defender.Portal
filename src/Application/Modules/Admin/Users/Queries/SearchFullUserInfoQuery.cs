using Defender.Common.DTOs;
using Defender.Common.Errors;
using Defender.Common.Extension;
using Defender.Portal.Application.Common.Interfaces.Services.Admin;
using Defender.Portal.Application.DTOs.Accounts;
using Defender.Portal.Application.DTOs.Admin;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Admin.Users.Queries;

public record SearchFullUserInfoQuery
    : IRequest<FullUserInfoForAdminDto>
{
    public Guid? UserId { get; init; }
    public string? Email { get; init; }
    public int? WalletNumber { get; init; }
};

public sealed class SearchFullUserInfoQueryValidator
    : AbstractValidator<SearchFullUserInfoQuery>
{
    public SearchFullUserInfoQueryValidator()
    {
        RuleFor(x => x.UserId)
            .NotNull()
            .When(x => x.Email == null && x.WalletNumber == null)
            .WithMessage(ErrorCode.VL_InvalidRequest);
    }
}

public class SearchFullUserInfoQueryHandler(
        IAdminAccountManagementService accountManagementService,
        IAdminWalletManagementService walletManagementService
        ) :
    IRequestHandler<SearchFullUserInfoQuery, FullUserInfoForAdminDto>
{
    public async Task<FullUserInfoForAdminDto> Handle(
        SearchFullUserInfoQuery request,
        CancellationToken cancellationToken)
    {
        var result = new FullUserInfoForAdminDto();
        Guid? userId = null;
        UserDto? userInfo = null;

        if (request.UserId != null)
        {
            userId = request.UserId.Value;
        }
        else if (request.Email != null)
        {
            userInfo = await accountManagementService.GetUserInfoByEmailAsync(request.Email);
            userId = userInfo.Id;
        }
        else if (request.WalletNumber != null)
        {
            result.Wallet = await walletManagementService.GetWalletInfoByNumberAsync(request.WalletNumber.Value);
            userId = result.Wallet.OwnerId;
        }

        if (userId.HasValue)
        {
            userInfo ??= await accountManagementService.GetUserInfoByIdAsync(userId.Value);
            var accountInfo = await accountManagementService.GetAccountInfoByIdAsync(userId.Value);

            result.User = MapToPortalUser(userInfo, accountInfo);

            result.Wallet ??= await walletManagementService.GetUserWalletInfoAsync(userId.Value);
        }

        return result;
    }

    public PortalAccountDto MapToPortalUser(UserDto user, AccountDto account)
    {
        return new PortalAccountDto
        {
            Id = user.Id,
            Email = user.Email,
            Nickname = user.Nickname,
            Phone = user.PhoneNumber,
            IsEmailVerified = account.IsEmailVerified,
            IsPhoneVerified = account.IsPhoneVerified,
            IsBlocked = account.IsBlocked,
            Roles = account.Roles,
            CreatedDate = user.CreatedDate
        };
    }
}