using Pokemon.Application.DTO.v1.ViewModel;
using Pokemon.Application.DTO.v1.InputModel;

namespace Pokemon.Application.Contracts.Services;

public interface IPokemonService
{
    Task<List<PokemonViewModel>> GetAll();
    Task<PokemonViewModel?> GetById(int id);
    Task<PokemonViewModel?> Create(AddPokemonInputModel inputModel);
    Task<PokemonViewModel?> Update(int id, UpdatePokemonInputModel inputModel);
    Task Delete(int id);
}