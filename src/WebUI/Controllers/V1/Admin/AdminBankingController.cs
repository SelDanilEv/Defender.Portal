using AutoMapper;
using Defender.Common.Attributes;
using Defender.Common.Consts;
using Defender.Portal.Application.DTOs.Banking;
using Defender.Portal.Application.Modules.Admin.Banking.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Defender.Portal.WebUI.Controllers.V1.Admin;

[Route("api/admin/banking")]
public class AdminBankingController(IMediator mediator, IMapper mapper)
    : BaseApiController(mediator, mapper)
{
    [HttpPost("recharge")]
    [Auth(Roles.SuperAdmin)]
    [ProducesResponseType(typeof(PortalTransactionDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> UpdateUserInfoAsAdminAsync(
        [FromBody] StartRechargeTransactionCommand command)
    {
        return await ProcessApiCallAsync<StartRechargeTransactionCommand, PortalTransactionDto>(command);
    }

}
