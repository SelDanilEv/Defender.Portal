using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces.Services;
using MediatR;

namespace Defender.Portal.Application.Modules.Verification.Commands;

public record SendEmailVerificationCodeCommand : IRequest<Unit>
{
};

public class SendEmailVerificationCodeCommandHandler(
        IAccessCodeService accessCodeService,
        ICurrentAccountAccessor currentAccountAccessor) 
    : IRequestHandler<SendEmailVerificationCodeCommand, Unit>
{
    public async Task<Unit> Handle(
        SendEmailVerificationCodeCommand request, 
        CancellationToken cancellationToken)
    {
        await accessCodeService.SendEmailVerificationAccessCodeAsync(
            currentAccountAccessor.GetAccountId());

        return Unit.Value;
    }

}
