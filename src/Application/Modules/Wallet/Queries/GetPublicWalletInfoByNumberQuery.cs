﻿using Defender.Common.Errors;
using Defender.Portal.Application.Common.Interfaces.Services.Wallets;
using Defender.Portal.Application.DTOs.Wallets;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Wallet.Queries;

public record GetPublicWalletInfoByNumberQuery 
    : IRequest<PublicPortalWalletInfoDto>
{
    public int WalletNumber { get; set; }
};

public sealed class GetPublicWalletInfoByNumberQueryValidator
    : AbstractValidator<GetPublicWalletInfoByNumberQuery>
{
    public GetPublicWalletInfoByNumberQueryValidator()
    {
        RuleFor(x => x.WalletNumber)
            .NotEmpty()
            .WithMessage(ErrorCodeHelper.GetErrorCode(
                ErrorCode.VL_WLT_EmptyWalletNumber))
            .InclusiveBetween(10000000, 99999999)
            .WithMessage(ErrorCodeHelper.GetErrorCode(
                ErrorCode.VL_WLT_InvalidWalletNumber));
    }
}

public class GetPublicWalletInfoByNumberQueryHandler(
        IWalletManagementService walletManagementService) : 
    IRequestHandler<GetPublicWalletInfoByNumberQuery, PublicPortalWalletInfoDto>
{
    public async Task<PublicPortalWalletInfoDto> Handle(
        GetPublicWalletInfoByNumberQuery request, 
        CancellationToken cancellationToken)
    {
        return await walletManagementService.GetPublicWalletInfoAsync(
            request.WalletNumber);
    }

}