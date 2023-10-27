using Pokemon.Domain.Contracts.Repository;
using Pokemon.Domain.Entities;
using Pokemon.Infraestructure.Abstractions;
using Pokemon.Infraestructure.Context;

namespace Pokemon.Infraestructure.Repositories;

public class PokemonTipoRepository : Repository<PokemonTipo>, IPokemonTipoRepository
{
    public PokemonTipoRepository(ApplicationDbContext context) : base(context)
    {
    }
}