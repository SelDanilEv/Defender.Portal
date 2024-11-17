using AutoMapper;
using Defender.Common.Attributes;
using Defender.Common.Consts;
using Defender.Common.DB.Pagination;
using Defender.Common.DTOs;
using Defender.Portal.Application.DTOs.Accounts;
using Defender.Portal.Application.DTOs.Admin;
using Defender.Portal.Application.DTOs.Auth;
using Defender.Portal.Application.Modules.Admin.Users.Commands;
using Defender.Portal.Application.Modules.Admin.Users.Queries;
using Defender.Portal.WebUI.Controllers;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Defender.Portal.WebUI.Controllers.V1.Admin;

[Route("api/admin/user")]
public class AdminUserController(IMediator mediator, IMapper mapper)
    : BaseApiController(mediator, mapper)
{

    [Auth(Roles.SuperAdmin)]
    [HttpPost("login")]
    [ProducesResponseType(typeof(SessionDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> CreateUserAsync(
        [FromBody] LoginUserAsAdminCommand command)
    {
        return await ProcessApiCallWithoutMappingAsync(command);
    }

    [HttpGet("search/full-user-info")]
    [Auth(Roles.Admin)]
    [ProducesResponseType(typeof(FullUserInfoForAdminDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> SearchFullUserInfoAsync(
    [FromQuery] SearchFullUserInfoQuery query)
    {
        return await ProcessApiCallAsync<SearchFullUserInfoQuery, FullUserInfoForAdminDto>
            (query);
    }

    [HttpGet("list")]
    [Auth(Roles.Admin)]
    [ProducesResponseType(typeof(FullUserInfoForAdminDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> GetUsersInfoAsync(
    [FromQuery] GetUsersInfoQuery query)
    {
        return await ProcessApiCallAsync<GetUsersInfoQuery, PagedResult<UserDto>>
            (query);
    }


    [HttpPut("update")]
    [Auth(Roles.Admin)]
    [ProducesResponseType(typeof(PortalUserDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> UpdateUserInfoAsAdminAsync(
        [FromBody] UpdateUserInfoAsAdminCommand command)
    {
        return await ProcessApiCallAsync<UpdateUserInfoAsAdminCommand, PortalUserDto>
            (command);
    }


    [HttpPut("account/update")]
    [Auth(Roles.Admin)]
    [ProducesResponseType(typeof(PortalAccountDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> UpdateAccountInfoAsAdminAsync(
        [FromBody] UpdateAccountInfoAsAdminCommand command)
    {
        return await ProcessApiCallAsync<UpdateAccountInfoAsAdminCommand, PortalAccountDto>
            (command);
    }


    [HttpPut("account/password/update")]
    [Auth(Roles.Admin)]
    [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> UpdateAccountInfoAsAdminAsync(
        [FromBody] UpdateAccountPasswordAsAdminCommand command)
    {
        return await ProcessApiCallAsync
            (command);
    }

}
