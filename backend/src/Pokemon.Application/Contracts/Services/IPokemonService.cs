using Pokemon.Application.DTO.v1.ViewModel;
using Pokemon.Application.DTO.v1.InputModel;

namespace Pokemon.Application.Contracts.Services;

public interface IPokemonService
{
    Task<List<PokemonViewModel>> GetAll();
    Task<List<PokemonViewModel>?> GetAllByPokemonTipo(int id);
    Task<PokemonViewModel?> GetById(int id);
    Task<AddPokemonViewModel?> Create(AddPokemonInputModel inputModel);
    Task<UpdatePokemonViewModel?> Update(int id, UpdatePokemonInputModel inputModel);
    Task Delete(int id);
}