using Pokemon.Domain.Contracts.Repository;
using Pokemon.Infraestructure.Abstractions;
using Pokemon.Infraestructure.Context;

namespace Pokemon.Infraestructure.Repositories;

public class PokemonRepository : Repository<Domain.Entities.Pokemon>, IPokemonRepository
{
    public PokemonRepository(ApplicationDbContext context) : base(context)
    {
    }
}