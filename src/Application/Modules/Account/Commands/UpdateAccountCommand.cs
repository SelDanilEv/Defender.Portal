using Defender.Common.DTOs;
using Defender.Common.Errors;
using Defender.Common.Exceptions;
using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Authorization.Commands;

public record UpdateAccountCommand(
        Guid? UserId,
        string? Nickname,
        string? PhoneNumber) 
    : IRequest<UserDto>
{

    public UserDto ToUserInfo()
    {
        return new UserDto()
        {
            Id = UserId.HasValue ? UserId.Value : Guid.Empty,
            PhoneNumber = PhoneNumber,
            Nickname = Nickname,
        };
    }
};

public sealed class UpdateAccountCommandValidator : AbstractValidator<UpdateAccountCommand>
{
    public UpdateAccountCommandValidator()
    {
        RuleFor(s => s.Nickname)
                  .NotEmpty().WithMessage(ErrorCodeHelper.GetErrorCode(ErrorCode.VL_USM_EmptyNickname));
    }
}

public sealed class UpdateAccountCommandHandler(
        ICurrentAccountAccessor currentAccountAccessor,
        IAccountManagementService accountManagementService) : IRequestHandler<UpdateAccountCommand, UserDto>
{
    public async Task<UserDto> Handle(UpdateAccountCommand request, CancellationToken cancellationToken)
    {
        var userId = request.UserId;

        if (request.UserId == null || request.UserId == Guid.Empty)
        {
            userId = currentAccountAccessor.GetAccountId();
        }

        if(userId == null || userId == Guid.Empty)
        {
            throw new ServiceException(ErrorCode.VL_InvalidRequest);
        }

        var user = request.ToUserInfo();
        user.Id = userId.Value;

        return await accountManagementService.UpdateUserInfoAsync(user);
    }
}
