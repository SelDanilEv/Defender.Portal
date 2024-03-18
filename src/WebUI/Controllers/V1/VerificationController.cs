using AutoMapper;
using Defender.Portal.Application.DTOs;
using Defender.Portal.Application.Modules.Verification.Commands;
using Defender.Portal.Application.Modules.Verification.Queries;
using Defender.Portal.Application.Modules.Wallet.Commands;
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
    public async Task<AccountVerificationDto> CheckAccountVerificationAsync(
        [FromQuery] CheckAccountVerificationQuery query)
    {
        return await ProcessApiCallAsync<CheckAccountVerificationQuery, AccountVerificationDto>
            (query);
    }

    [HttpPost("verify/email")]
    [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<bool> VerifyEmailAccountAsync(
        [FromBody] VerifyAccountEmailCommand command)
    {
        return await ProcessApiCallAsync<VerifyAccountEmailCommand, bool>
            (command);
    }

    [HttpPost("send/update-account")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task SendUpdateAccountCodeAsync()
    {
        await ProcessApiCallAsync<SendUpdateAccountAccessCodeCommand>
            (new SendUpdateAccountAccessCodeCommand());
    }

    [HttpPost("verify/code")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<bool> VerifyAccessCodeAsync([FromBody] VerifyAccessCodeCommand command)
    {
        return await ProcessApiCallWithoutMappingAsync<VerifyAccessCodeCommand, bool>
            (command);
    }

    [HttpPost("resend/email")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task ResendEmailVerificationAsync()
    {
        await ProcessApiCallAsync<SendEmailVerificationCommand>
            (new SendEmailVerificationCommand());
    }
}
