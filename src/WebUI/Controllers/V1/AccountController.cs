using AutoMapper;
using Defender.Portal.Application.DTOs.Accounts;
using Defender.Portal.Application.Modules.Authorization.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Defender.Portal.WebUI.Controllers.V1;

public class AccountController : BaseApiController
{
    public AccountController(IMediator mediator, IMapper mapper) : base(mediator, mapper)
    {
    }

    [HttpPut("update")]
    [ProducesResponseType(typeof(PortalAccountDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<PortalUserDto> UpdateAccountInfoAsync(
        [FromBody] UpdateAccountCommand command)
    {
        return await ProcessApiCallAsync<UpdateAccountCommand, PortalUserDto>
            (command);
    }

    [HttpPut("update/sentitive")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task UpdateAccountSentitiveInfoAsync(
        [FromBody] UpdateAccountSentitiveInfoCommand command)
    {
        await ProcessApiCallAsync<UpdateAccountSentitiveInfoCommand>
            (command);
    }
}
