using Defender.Portal.Application.Common.Interfaces.Services.Banking;
using Defender.Portal.Application.DTOs.Banking;
using Defender.Portal.Application.Enums;
using FluentValidation;
using Defender.Common.Extension;
using MediatR;

namespace Defender.Portal.Application.Modules.Wallet.Commands;

public record CreateCurrencyAccountCommand : IRequest<PortalWalletInfoDto>
{
    public Currency Currency { get; set; }
};

public sealed class CreateCurrencyAccountCommandValidator : AbstractValidator<CreateCurrencyAccountCommand>
{
    public CreateCurrencyAccountCommandValidator()
    {

    }
}

public sealed class CreateCurrencyAccountCommandHandler : IRequestHandler<CreateCurrencyAccountCommand, PortalWalletInfoDto>
{
    private readonly IWalletManagementService _walletManagementService;

    public CreateCurrencyAccountCommandHandler(
        IWalletManagementService walletManagementService
        )
    {
        _walletManagementService = walletManagementService;
    }

    public async Task<PortalWalletInfoDto> Handle(CreateCurrencyAccountCommand request, CancellationToken cancellationToken)
    {
        return await _walletManagementService.CreateNewAccountAsync(
            request.Currency);
    }
}
