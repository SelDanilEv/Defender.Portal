using AutoMapper;
using Defender.Portal.Application.Models.Session;
using Defender.Portal.Application.Modules.Authorization.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Defender.Portal.WebUI.Controllers.V1;

public class AuthorizationController : BaseApiController
{
    public AuthorizationController(IMediator mediator, IMapper mapper) : base(mediator, mapper)
    {
    }

    [HttpPost("login")]
    [ProducesResponseType(typeof(Session), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<Session> LoginWithPasswordAsync(
        [FromBody] LoginWithPasswordCommand command)
    {
        return await ProcessApiCallWithoutMappingAsync<LoginWithPasswordCommand, Session>
            (command);
    }

    [HttpPost("create")]
    [ProducesResponseType(typeof(Session), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<Session> CreateUserAsync(
        [FromBody] CreateAccountCommand command)
    {
        return await ProcessApiCallWithoutMappingAsync<CreateAccountCommand, Session>
            (command);
    }
}
