using Defender.Common.DTOs;
using Defender.Common.Errors;
using Defender.Common.Extension;
using Defender.Portal.Application.Common.Interfaces.Services.Accounts;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Admin.Users.Commands;

public record UpdateUserInfoAsAdminCommand(
        Guid UserId,
        string? Email,
        string? Nickname,
        string? PhoneNumber)
    : IRequest<UserDto>
{

    public UserDto ToUserInfo()
    {
        return new UserDto()
        {
            Id = UserId,
            Email = Email,
            PhoneNumber = PhoneNumber,
            Nickname = Nickname,
        };
    }
};

public sealed class UpdateUserInfoAsAdminCommandValidator : AbstractValidator<UpdateUserInfoAsAdminCommand>
{
    public UpdateUserInfoAsAdminCommandValidator()
    {
        RuleFor(x => x.UserId)
            .NotNull()
            .WithMessage(ErrorCode.VL_InvalidRequest);

        RuleFor(x => x.Email)
            .NotNull()
            .When(x => x.Nickname == null && x.PhoneNumber == null)
            .WithMessage(ErrorCode.VL_InvalidRequest);
    }
}

public sealed class UpdateUserInfoAsAdminCommandHandler(
        IAccountManagementService accountManagementService)
    : IRequestHandler<UpdateUserInfoAsAdminCommand, UserDto>
{
    public async Task<UserDto> Handle(UpdateUserInfoAsAdminCommand request, CancellationToken cancellationToken)
    {
        var user = request.ToUserInfo();

        return await accountManagementService.UpdateUserInfoAsCurrentUserAsync(user);
    }
}
