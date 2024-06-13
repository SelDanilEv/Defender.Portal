using AutoMapper;
using Defender.Common.Attributes;
using Defender.Common.Consts;
using Defender.Portal.Application.DTOs.Accounts;
using Defender.Portal.Application.Modules.Verification.Commands;
using Defender.Portal.Application.Modules.Verification.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Defender.Portal.WebUI.Controllers.V1;

public class VerificationController : BaseApiController
{
    public VerificationController(IMediator mediator, IMapper mapper) : base(mediator, mapper)
    {
    }

    [HttpGet("check")]
    [ProducesResponseType(typeof(AccountVerificationDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> CheckAccountVerificationAsync(
        [FromQuery] CheckAccountVerificationQuery query)
    {
        return await ProcessApiCallAsync<CheckAccountVerificationQuery, AccountVerificationDto>
            (query);
    }

    [HttpPost("verify/email")]
    [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> VerifyEmailAccountAsync(
        [FromBody] VerifyAccountEmailCommand command)
    {
        return await ProcessApiCallAsync<VerifyAccountEmailCommand, bool>
            (command);
    }

    [HttpPost("send/update-account")]
    [Auth(Roles.User)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> SendUpdateAccountCodeAsync()
    {
        return await ProcessApiCallAsync<SendUpdateAccountAccessCodeCommand>
            (new SendUpdateAccountAccessCodeCommand());
    }

    [HttpPost("send/reset-password")]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> SendResetPasswordCodeAsync(
        [FromBody] SendPasswordResetCodeCommand command)
    {
        return await ProcessApiCallAsync<SendPasswordResetCodeCommand, Guid>(command);
    }

    [HttpPost("verify/code")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> VerifyAccessCodeAsync([FromBody] VerifyAccessCodeCommand command)
    {
        return await ProcessApiCallWithoutMappingAsync<VerifyAccessCodeCommand, bool>(command);
    }

    [HttpPost("resend/email")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> ResendEmailVerificationAsync()
    {
        return await ProcessApiCallAsync<SendEmailVerificationCodeCommand>
            (new SendEmailVerificationCodeCommand());
    }
}
