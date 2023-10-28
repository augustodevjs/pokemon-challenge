namespace Pokemon.Domain.Contracts.Repository;

public interface IPokemonRepository : IRepository<Entities.Pokemon>
{
    Task<List<Entities.Pokemon>> getPokemonsByPokemonTipo(int? id);
}