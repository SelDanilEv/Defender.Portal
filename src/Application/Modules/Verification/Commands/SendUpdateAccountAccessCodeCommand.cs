using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces;
using MediatR;

namespace Defender.Portal.Application.Modules.Verification.Commands;

public record SendUpdateAccountAccessCodeCommand : IRequest<Unit>
{
};

public class SendUpdateAccountAccessCodeCommandHandler : IRequestHandler<SendUpdateAccountAccessCodeCommand, Unit>
{
    private readonly IAccessCodeService _accessCodeService;
    private readonly IAccountAccessor _accountAccessor;

    public SendUpdateAccountAccessCodeCommandHandler(
        IAccessCodeService accessCodeService,
        IAccountAccessor accountAccessor
        )
    {
        _accessCodeService = accessCodeService;
        _accountAccessor = accountAccessor;
    }

    public async Task<Unit> Handle(SendUpdateAccountAccessCodeCommand request, CancellationToken cancellationToken)
    {
        await _accessCodeService.SendUserUpdateAccessCodeAsync(_accountAccessor?.AccountInfo?.Id);

        return Unit.Value;
    }

}
