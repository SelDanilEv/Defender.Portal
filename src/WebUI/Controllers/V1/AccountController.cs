using AutoMapper;
using Defender.Common.Attributes;
using Defender.Common.Consts;
using Defender.Portal.Application.DTOs.Accounts;
using Defender.Portal.Application.Modules.Account.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Defender.Portal.WebUI.Controllers.V1;

public class AccountController : BaseApiController
{
    public AccountController(IMediator mediator, IMapper mapper) : base(mediator, mapper)
    {
    }

    [HttpPut("update")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(PortalUserDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<PortalUserDto> UpdateUserInfoAsync(
        [FromBody] UpdateUserInfoCommand command)
    {
        return await ProcessApiCallAsync<UpdateUserInfoCommand, PortalUserDto>
            (command);
    }

    [HttpPut("reset-password")]
    [ProducesResponseType(typeof(PortalUserDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task ResetPasswordAsync([FromBody] ResetPasswordCommand command)
    {
        await ProcessApiCallAsync<ResetPasswordCommand>(command);
    }

    [HttpPut("update/sensitive")]
    [Auth(Roles.User)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task UpdateAccountSensitiveInfoAsync(
        [FromBody] UpdateMyAccountSensitiveInfoCommand command)
    {
        await ProcessApiCallAsync<UpdateMyAccountSensitiveInfoCommand>
            (command);
    }
}
