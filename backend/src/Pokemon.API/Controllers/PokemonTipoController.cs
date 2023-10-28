using Microsoft.AspNetCore.Mvc;
using Pokemon.Application.Notifications;
using Swashbuckle.AspNetCore.Annotations;
using Pokemon.Application.DTO.v1.ViewModel;
using Pokemon.Application.Contracts.Services;

namespace Pokemon.API.Controllers;

[Route("pokemon-tipo")]
public class PokemonTipoController : MainController
{
    private readonly IPokemonTipoServce _pokemonTipoServce;

    public PokemonTipoController(INotificator notificator, IPokemonTipoServce pokemonTipoServce) : base(notificator)
    {
        _pokemonTipoServce = pokemonTipoServce;
    }
    
    [HttpGet]
    [SwaggerOperation(Summary = "Get all Pokemons-Types")]
    [ProducesResponseType(typeof(List<PokemonTipoViewModel>), StatusCodes.Status200OK)]
    public async Task<List<PokemonTipoViewModel>> Get()
    {
        return await _pokemonTipoServce.GetAll();
    }
}