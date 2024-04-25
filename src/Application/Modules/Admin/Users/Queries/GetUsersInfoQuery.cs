using Defender.Common.DB.Pagination;
using Defender.Common.DTOs;
using Defender.Portal.Application.Common.Interfaces.Services.Admin;
using FluentValidation;
using MediatR;

namespace Defender.Portal.Application.Modules.Admin.Users.Queries;

public record GetUsersInfoQuery
    : PaginationRequest, IRequest<PagedResult<UserDto>>
{
};

public sealed class GetUsersInfoQueryValidator
    : AbstractValidator<GetUsersInfoQuery>
{
    public GetUsersInfoQueryValidator()
    {
    }
}

public class GetUsersInfoQueryHandler(
    IAdminAccountManagementService accountManagementService)
        : IRequestHandler<GetUsersInfoQuery, PagedResult<UserDto>>
{
    public async Task<PagedResult<UserDto>> Handle(
        GetUsersInfoQuery request,
        CancellationToken cancellationToken)
    {
        return await accountManagementService.GetUsersInfoAsync(request);
    }

}