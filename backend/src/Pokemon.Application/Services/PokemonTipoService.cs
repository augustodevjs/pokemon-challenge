using AutoMapper;
using Pokemon.Application.Contracts.Services;
using Pokemon.Application.DTO.v1.ViewModel;
using Pokemon.Application.Notifications;
using Pokemon.Domain.Contracts.Repository;

namespace Pokemon.Application.Services;

public class PokemonTipoService : BaseService, IPokemonTipoServce
{
    private readonly IPokemonTipoRepository _pokemonTipoRepository;

    public PokemonTipoService(IMapper mapper, INotificator notificator, IPokemonTipoRepository pokemonTipoRepository) :
        base(mapper, notificator)
    {
        _pokemonTipoRepository = pokemonTipoRepository;
    }

    public async Task<List<PokemonTipoViewModel>> GetAll()
    {
        var getAllPokemonsTypes = await _pokemonTipoRepository.GetAll();
        return Mapper.Map<List<PokemonTipoViewModel>>(getAllPokemonsTypes);
    }
}