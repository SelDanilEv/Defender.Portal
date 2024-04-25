using Defender.Common.DTOs;
using Defender.Common.Errors;
using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Account.Commands;

public record UpdateUserInfoCommand(
        string? Nickname,
        string? PhoneNumber)
    : IRequest<UserDto>
{

    public UserDto ToUserInfo()
    {
        return new UserDto()
        {
            PhoneNumber = PhoneNumber,
            Nickname = Nickname,
        };
    }
};

public sealed class UpdateUserInfoCommandValidator : AbstractValidator<UpdateUserInfoCommand>
{
    public UpdateUserInfoCommandValidator()
    {
        RuleFor(s => s.Nickname)
                  .NotEmpty().WithMessage(ErrorCodeHelper.GetErrorCode(ErrorCode.VL_USM_EmptyNickname));
    }
}

public sealed class UpdateUserInfoCommandHandler(
        ICurrentAccountAccessor currentAccountAccessor,
        IAccountManagementService accountManagementService) : IRequestHandler<UpdateUserInfoCommand, UserDto>
{
    public async Task<UserDto> Handle(UpdateUserInfoCommand request, CancellationToken cancellationToken)
    {
        var user = request.ToUserInfo();
        user.Id = currentAccountAccessor.GetAccountId();

        return await accountManagementService.UpdateUserInfoAsync(user);
    }
}
