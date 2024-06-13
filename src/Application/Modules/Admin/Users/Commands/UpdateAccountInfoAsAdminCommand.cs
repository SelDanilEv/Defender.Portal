using Defender.Common.DTOs;
using Defender.Common.Enums;
using Defender.Common.Errors;
using Defender.Portal.Application.Common.Interfaces.Services.Admin;
using Defender.Portal.Application.Models.ApiRequests.Accounts;
using FluentValidation;
using Defender.Common.Extension;
using MediatR;

namespace Defender.Portal.Application.Modules.Admin.Users.Commands;

public record UpdateAccountInfoAsAdminCommand(
        Guid UserId,
        Role? Role,
        bool? IsPhoneVerified,
        bool? IsEmailVerified,
        bool? IsBlocked)
    : UpdateAccountInfoAsAdminRequest(
        UserId,
        Role,
        IsPhoneVerified,
        IsEmailVerified,
        IsBlocked),
    IRequest<AccountDto>
{
}

public sealed class UpdateAccountInfoAsAdminCommandValidator : AbstractValidator<UpdateAccountInfoAsAdminCommand>
{
    public UpdateAccountInfoAsAdminCommandValidator()
    {
        RuleFor(x => x.UserId)
            .NotNull()
            .WithMessage(ErrorCode.VL_InvalidRequest);

        RuleFor(x => x.Role)
            .NotNull()
            .When(x => x.IsPhoneVerified == null
                && x.IsEmailVerified == null
                && x.IsBlocked == null)
            .WithMessage(ErrorCode.VL_InvalidRequest);
    }
}

public sealed class UpdateAccountInfoAsAdminCommandHandler(
        IAdminAccountManagementService accountManagementService)
    : IRequestHandler<UpdateAccountInfoAsAdminCommand, AccountDto>
{
    public async Task<AccountDto> Handle(
        UpdateAccountInfoAsAdminCommand request,
        CancellationToken cancellationToken)
    {
        return await accountManagementService.UpdateAccountInfoAsync(request);
    }
}
