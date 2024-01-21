using Defender.Common.DTOs;
using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Authorization.Commands;

public record UpdateAccountSentitiveInfoCommand : IRequest<Unit>
{
    public Guid? UserId { get; set; }
    public string? Email { get; set; }
    public string? NewPassword { get; set; }

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

public sealed class UpdateAccountSentitiveInfoCommandHandler : 
    IRequestHandler<UpdateAccountSentitiveInfoCommand, Unit>
{
    private readonly IAccountAccessor _accountAccessor;
    private readonly IAccountManagementService _accountManagementService;

    public UpdateAccountSentitiveInfoCommandHandler(
        IAccountAccessor accountAccessor,
        IAccountManagementService accountManagementService
        )
    {
        _accountAccessor = accountAccessor;
        _accountManagementService = accountManagementService;
    }

    public async Task<Unit> Handle(
        UpdateAccountSentitiveInfoCommand request, 
        CancellationToken cancellationToken)
    {
        if (request.UserId == null || request.UserId == Guid.Empty)
        {
            request.UserId = _accountAccessor.AccountInfo?.Id;
        }

        await _accountManagementService.UpdateUserSentitiveInfoAsync(request);

        return Unit.Value;
    }
}
