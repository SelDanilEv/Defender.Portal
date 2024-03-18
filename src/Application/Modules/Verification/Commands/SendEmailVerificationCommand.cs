using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces.Services;
using MediatR;

namespace Defender.Portal.Application.Modules.Verification.Commands;

public record SendEmailVerificationCommand : IRequest<Unit>
{
};

public class SendVerificationEmailCommandHandler : IRequestHandler<SendEmailVerificationCommand, Unit>
{
    private readonly IAccessCodeService _accessCodeService;
    private readonly ICurrentAccountAccessor _currentAccountAccessor;

    public SendVerificationEmailCommandHandler(
        IAccessCodeService accessCodeService,
        ICurrentAccountAccessor accountAccessor
        )
    {
        _accessCodeService = accessCodeService;
        _currentAccountAccessor = accountAccessor;
    }

    public async Task<Unit> Handle(SendEmailVerificationCommand request, CancellationToken cancellationToken)
    {
        await _accessCodeService.SendEmailVerificationAccessCodeAsync(_currentAccountAccessor.GetAccountId());

        return Unit.Value;
    }

}
