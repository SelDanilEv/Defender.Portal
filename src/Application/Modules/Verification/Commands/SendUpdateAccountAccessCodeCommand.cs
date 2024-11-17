using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces.Services;
using MediatR;

namespace Defender.Portal.Application.Modules.Verification.Commands;

public record SendUpdateAccountAccessCodeCommand : IRequest<Unit>
{
};

public class SendUpdateAccountAccessCodeCommandHandler(
        IAccessCodeService accessCodeService,
        ICurrentAccountAccessor currentAccountAccessor)
    : IRequestHandler<SendUpdateAccountAccessCodeCommand, Unit>
{
    public async Task<Unit> Handle(
        SendUpdateAccountAccessCodeCommand request,
        CancellationToken cancellationToken)
    {
        await accessCodeService.SendUserUpdateAccessCodeAsync(
            currentAccountAccessor.GetAccountId());

        return Unit.Value;
    }

}
