using Defender.Common.DTOs;
using Defender.Common.Interfaces;
using Defender.Portal.Application.Common.Interfaces.Services;
using MediatR;

namespace Defender.Portal.Application.Modules.Verification.Queries;

public record CheckAccountVerificationQuery : IRequest<AccountDto>
{
};

public class CheckAccountVerificationQueryHandler : IRequestHandler<CheckAccountVerificationQuery, AccountDto>
{
    private readonly IAccountManagementService _accountManagementService;
    private readonly ICurrentAccountAccessor _currentAccountAccessor;

    public CheckAccountVerificationQueryHandler(
        IAccountManagementService accountManagementService,
        ICurrentAccountAccessor accountAccessor
        )
    {
        _accountManagementService = accountManagementService;
        _currentAccountAccessor = accountAccessor;
    }

    public async Task<AccountDto> Handle(CheckAccountVerificationQuery request, CancellationToken cancellationToken)
    {
        return await _accountManagementService.GetAccountDetailsAsync(_currentAccountAccessor.GetAccountId());
    }

}