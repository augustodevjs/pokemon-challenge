using Pokemon.Application.DTO.v1.ViewModel;

namespace Pokemon.Application.Contracts.Services;

public interface IPokemonTipoServce
{
    Task<List<PokemonTipoViewModel>> GetAll();
}