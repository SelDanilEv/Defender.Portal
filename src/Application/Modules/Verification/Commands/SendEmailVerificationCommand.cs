using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces;
using MediatR;

namespace Defender.Portal.Application.Modules.Verification.Commands;

public record SendEmailVerificationCommand : IRequest<Unit>
{
};

public class SendVerificationEmailCommandHandler : IRequestHandler<SendEmailVerificationCommand, Unit>
{
    private readonly IAccessCodeService _accessCodeService;
    private readonly IAccountAccessor _accountAccessor;

    public SendVerificationEmailCommandHandler(
        IAccessCodeService accessCodeService,
        IAccountAccessor accountAccessor
        )
    {
        _accessCodeService = accessCodeService;
        _accountAccessor = accountAccessor;
    }

    public async Task<Unit> Handle(SendEmailVerificationCommand request, CancellationToken cancellationToken)
    {
        await _accessCodeService.SendEmailVerificationAccessCodeAsync(_accountAccessor?.AccountInfo?.Id);

        return Unit.Value;
    }

}
