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
    private readonly ICurrentAccountAccessor _currentAccountAccessor;

    public SendUpdateAccountAccessCodeCommandHandler(
        IAccessCodeService accessCodeService,
        ICurrentAccountAccessor currentAccountAccessor
        )
    {
        _accessCodeService = accessCodeService;
        _currentAccountAccessor = currentAccountAccessor;
    }

    public async Task<Unit> Handle(SendUpdateAccountAccessCodeCommand request, CancellationToken cancellationToken)
    {
        await _accessCodeService.SendUserUpdateAccessCodeAsync(_currentAccountAccessor.GetAccountId());

        return Unit.Value;
    }

}
