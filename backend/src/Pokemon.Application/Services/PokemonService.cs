using AutoMapper;
using Pokemon.Application.Contracts.Services;
using Pokemon.Application.DTO.v1.InputModel;
using Pokemon.Application.DTO.v1.ViewModel;
using Pokemon.Application.Notifications;
using Pokemon.Domain.Contracts.Repository;

namespace Pokemon.Application.Services;

public class PokemonService : BaseService, IPokemonService
{
    private readonly IPokemonRepository _pokemonRepository;

    public PokemonService(IMapper mapper, INotificator notificator, IPokemonRepository pokemonRepository) : base(mapper,
        notificator)
    {
        _pokemonRepository = pokemonRepository;
    }

    public async Task<List<PokemonViewModel>> GetAll()
    {
        var getAllPokemons = await _pokemonRepository.GetAll();
        return Mapper.Map<List<PokemonViewModel>>(getAllPokemons);
    }

    public async Task<PokemonViewModel?> GetById(int id)
    {
        var getPokemon = await _pokemonRepository.GetById(id);

        if (getPokemon != null) return Mapper.Map<PokemonViewModel>(getPokemon);
        
        Notificator.HandleNotFoundResource();
        return null;
    }

    public async Task<PokemonViewModel?> Create(AddPokemonInputModel inputModel)
    {
        throw new NotImplementedException();
    }

    public async Task<PokemonViewModel?> Update(int id, UpdatePokemonInputModel inputModel)
    {
        throw new NotImplementedException();
    }

    public async Task Delete(int id)
    {
        throw new NotImplementedException();
    }
}