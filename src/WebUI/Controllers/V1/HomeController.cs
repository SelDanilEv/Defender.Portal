using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Defender.Common.Attributes;
using Defender.Common.Consts;
using Defender.Common.Enums;
using Defender.Common.DTOs;
using Defender.Common.Modules.Home.Queries;

namespace Defender.Portal.WebUI.Controllers.V1;

public partial class HomeController(
        IMediator mediator,
        IMapper mapper)
    : BaseApiController(mediator, mapper)
{
    [HttpGet("health")]
    [ProducesResponseType(typeof(HealthCheckDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> HealthCheckAsync()
    {
        var query = new HealthCheckQuery();

        return await ProcessApiCallWithoutMappingAsync(query);
    }

    [HttpGet("authorization/check")]
    [Auth(Roles.User)]
    [ProducesResponseType(typeof(AuthCheckDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> AuthorizationCheckAsync()
    {
        var query = new AuthCheckQuery();

        return await ProcessApiCallWithoutMappingAsync(query);
    }

    [Auth(Roles.SuperAdmin)]
    [HttpGet("configuration")]
    [ProducesResponseType(typeof(Dictionary<string, string>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> GetConfigurationAsync(ConfigurationLevel configurationLevel)
    {
        var query = new GetConfigurationQuery()
        {
            Level = configurationLevel
        };

        return await ProcessApiCallWithoutMappingAsync(query);
    }
}
