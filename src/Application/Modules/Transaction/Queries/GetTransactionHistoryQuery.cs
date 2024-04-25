using Defender.Common.DB.Pagination;
using Defender.Common.Errors;
using Defender.Portal.Application.Common.Interfaces.Services.Banking;
using Defender.Portal.Application.DTOs.Banking;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Transaction.Queries;

public record GetTransactionHistoryQuery
    : PaginationRequest, IRequest<PagedResult<PortalTransactionDto>>
{
    public Guid? WalletId { get; set; }
};

public sealed class GetTransactionHistoryQueryValidator
    : AbstractValidator<GetTransactionHistoryQuery>
{
    public GetTransactionHistoryQueryValidator()
    {
    }
}

public class GetTransactionHistoryQueryHandler(
        ITransactionService transactionService) :
    IRequestHandler<GetTransactionHistoryQuery, PagedResult<PortalTransactionDto>>
{
    public async Task<PagedResult<PortalTransactionDto>> Handle(
        GetTransactionHistoryQuery request,
        CancellationToken cancellationToken)
    {
        return await transactionService.GetTransactionHistoryAsync(request, request.WalletId);
    }

}