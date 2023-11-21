using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces;
using MediatR;

namespace Defender.Portal.Application.Modules.Verification.Commands;

public record SendVerificationEmailCommand : IRequest<Unit>
{
};

public class SendVerificationEmailCommandHandler : IRequestHandler<SendVerificationEmailCommand, Unit>
{
    private readonly IAuthorizationService _authorizationService;
    private readonly IAccountAccessor _accountAccessor;

    public SendVerificationEmailCommandHandler(
        IAuthorizationService authorizationService,
        IAccountAccessor accountAccessor
        )
    {
        _authorizationService = authorizationService;
        _accountAccessor = accountAccessor;
    }

    public async Task<Unit> Handle(SendVerificationEmailCommand request, CancellationToken cancellationToken)
    {
        await _authorizationService.SendVerificationEmailAsync(_accountAccessor.AccountInfo.Id);

        return Unit.Value;
    }

}
