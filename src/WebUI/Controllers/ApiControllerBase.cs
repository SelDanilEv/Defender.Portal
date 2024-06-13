using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Defender.Portal.WebUI.Controllers;

[Route("api/[controller]")]
public class BaseApiController(IMediator mediator, IMapper mapper) : ControllerBase
{
    protected readonly IMediator _mediator = mediator;
    protected readonly IMapper _mapper = mapper;

    protected async Task<ActionResult> ProcessApiCallAsync<TRequest, TResult>(TRequest request)
    {
        var response = await _mediator.Send(request);

        var result = _mapper.Map<TResult>(response);

        return Ok(result);
    }

    protected async Task<ActionResult> ProcessApiCallAsync<TRequest>(TRequest request)
    {
        await _mediator.Send(request);

        return Ok();
    }

    protected async Task<ActionResult> ProcessApiCallWithoutMappingAsync<TRequest, TResult>(TRequest request)
    {
        var response = await _mediator.Send(request);

        return Ok(response);
    }
}
