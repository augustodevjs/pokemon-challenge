using Microsoft.AspNetCore.Mvc;
using Pokemon.Application.Notifications;
using Swashbuckle.AspNetCore.Annotations;
using Pokemon.Application.DTO.v1.ViewModel;
using Pokemon.Application.DTO.v1.InputModel;
using Pokemon.Application.Contracts.Services;

namespace Pokemon.API.Controllers;

[Route("pokemon")]
public class PokemonController : MainController
{
    private readonly IPokemonService _pokemonService;

    public PokemonController(INotificator notificator, IPokemonService pokemonService) : base(notificator)
    {
        _pokemonService = pokemonService;
    }
    
    [HttpGet]
    [SwaggerOperation(Summary = "Get all Pokemons")]
    [ProducesResponseType(typeof(List<PokemonViewModel>), StatusCodes.Status200OK)]
    public async Task<List<PokemonViewModel>> Get()
    {
        return await _pokemonService.GetAll();
    }
    
    [HttpGet("pokemon-tipo/{id}")]
    [SwaggerOperation(Summary = "Get all Pokemons by Pokemon Type")]
    [ProducesResponseType(typeof(List<PokemonViewModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(NotFoundResult), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetPokemonsByPokemonType(int id)
    {
        var getPokemon = await _pokemonService.GetAllByPokemonTipo(id);
        return OkResponse(getPokemon);
    }

    [HttpGet("{id}")]
    [SwaggerOperation(Summary = "Get a pokemon")]
    [ProducesResponseType(typeof(PokemonViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(NotFoundResult), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(int id)
    {
        var getPokemon = await _pokemonService.GetById(id);
        return OkResponse(getPokemon);
    }
    
    [HttpPost]
    [SwaggerOperation("Add a new pokemon")]
    [ProducesResponseType(typeof(AddPokemonViewModel), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(BadRequestResult), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] AddPokemonInputModel inputModel)
    {
        var pokemon = await _pokemonService.Create(inputModel);
        return CreatedResponse("", pokemon);
    }
    
    [HttpPut("{id}")]
    [SwaggerOperation("Update a pokemon")]
    [ProducesResponseType(typeof(UpdatePokemonViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(NotFoundResult), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(BadRequestResult), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Update(int id, [FromBody] UpdatePokemonInputModel inputModel)
    {
        var updatePokemon = await _pokemonService.Update(id, inputModel);
        return OkResponse(updatePokemon);
    }
    
    [HttpDelete("{id}")]
    [SwaggerOperation("Delete a pokemon")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(NotFoundResult), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        await _pokemonService.Delete(id);
        return NoContentResponse();
    }
}