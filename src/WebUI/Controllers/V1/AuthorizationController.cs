using AutoMapper;
using Defender.Portal.Application.DTOs.Auth;
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
    [ProducesResponseType(typeof(SessionDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<SessionDto> LoginWithPasswordAsync(
        [FromBody] LoginWithPasswordCommand command)
    {
        return await ProcessApiCallWithoutMappingAsync<LoginWithPasswordCommand, SessionDto>
            (command);
    }

    [HttpPost("google")]
    [ProducesResponseType(typeof(SessionDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<SessionDto> LoginWithGoogleTokenAsync(
        [FromBody] LoginWithGoogleTokenCommand command)
    {
        return await ProcessApiCallWithoutMappingAsync<LoginWithGoogleTokenCommand, SessionDto>
            (command);
    }

    [HttpPost("create")]
    [ProducesResponseType(typeof(SessionDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<SessionDto> CreateUserAsync(
        [FromBody] CreateAccountCommand command)
    {
        return await ProcessApiCallWithoutMappingAsync<CreateAccountCommand, SessionDto>
            (command);
    }
}
