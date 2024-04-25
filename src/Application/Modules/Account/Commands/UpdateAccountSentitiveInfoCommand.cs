using Defender.Common.DTOs;
using Defender.Common.Errors;
using Defender.Common.Exceptions;
using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Account.Commands;

public record UpdateAccountSentitiveInfoCommand(
        Guid? UserId,
        string? Email,
        string? NewPassword)
    : IRequest<Unit>
{
    public UserDto ToUserInfo()
    {
        return new UserDto()
        {
            Id = UserId.HasValue ? UserId.Value : Guid.Empty,
            Email = Email,
        };
    }
};

public sealed class UpdateAccountSentitiveInfoCommandValidator : AbstractValidator<UpdateAccountSentitiveInfoCommand>
{
    public UpdateAccountSentitiveInfoCommandValidator()
    {
    }
}

public sealed class UpdateAccountSentitiveInfoCommandHandler(
        ICurrentAccountAccessor currentAccountAccessor,
        IAccountManagementService accountManagementService) :
    IRequestHandler<UpdateAccountSentitiveInfoCommand, Unit>
{
    public async Task<Unit> Handle(
        UpdateAccountSentitiveInfoCommand request,
        CancellationToken cancellationToken)
    {
        var userId = request.UserId;

        if (request.UserId == null || request.UserId == Guid.Empty)
        {
            userId = currentAccountAccessor.GetAccountId();
        }

        if (userId == null || userId == Guid.Empty)
        {
            throw new ServiceException(ErrorCode.VL_InvalidRequest);
        }

        var user = request.ToUserInfo();
        user.Id = userId.Value;

        await accountManagementService.UpdateUserSentitiveInfoAsync(user, request.NewPassword);

        return Unit.Value;
    }
}
