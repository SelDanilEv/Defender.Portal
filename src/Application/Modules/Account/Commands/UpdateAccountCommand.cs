using Defender.Common.DTOs;
using Defender.Common.Errors;
using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Authorization.Commands;

public record UpdateAccountCommand : IRequest<UserDto>
{
    public Guid? UserId { get; set; }
    public string? Nickname { get; set; }
    public string? PhoneNumber { get; set; }

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

public sealed class UpdateAccountCommandHandler : IRequestHandler<UpdateAccountCommand, UserDto>
{
    private readonly IAccountAccessor _accountAccessor;
    private readonly IAccountManagementService _accountManagementService;

    public UpdateAccountCommandHandler(
        IAccountAccessor accountAccessor,
        IAccountManagementService accountManagementService
        )
    {
        _accountAccessor = accountAccessor;
        _accountManagementService = accountManagementService;
    }

    public async Task<UserDto> Handle(UpdateAccountCommand request, CancellationToken cancellationToken)
    {
        if (request.UserId == null || request.UserId == Guid.Empty)
        {
            request.UserId = _accountAccessor.AccountInfo?.Id;
        }

        return await _accountManagementService.UpdateUserInfoAsync(request);
    }
}
