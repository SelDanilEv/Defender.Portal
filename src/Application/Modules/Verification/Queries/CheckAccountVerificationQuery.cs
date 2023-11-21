using Defender.Common.DTOs;
using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces;
using MediatR;

namespace Defender.Portal.Application.Modules.Verification.Queries;

public record CheckAccountVerificationQuery : IRequest<AccountDto>
{
};

public class CheckAccountVerificationQueryHandler : IRequestHandler<CheckAccountVerificationQuery, AccountDto>
{
    private readonly IAccountManagementService _accountManagementService;
    private readonly IAccountAccessor _accountAccessor;

    public CheckAccountVerificationQueryHandler(
        IAccountManagementService accountManagementService,
        IAccountAccessor accountAccessor
        )
    {
        _accountManagementService = accountManagementService;
        _accountAccessor = accountAccessor;
    }

    public async Task<AccountDto> Handle(CheckAccountVerificationQuery request, CancellationToken cancellationToken)
    {
        return await _accountManagementService.GetAccountDetails(_accountAccessor.AccountInfo.Id);
    }

}
