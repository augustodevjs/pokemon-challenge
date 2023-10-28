using Microsoft.EntityFrameworkCore;
using Pokemon.Infraestructure.Context;
using Pokemon.Domain.Contracts.Repository;
using Pokemon.Infraestructure.Abstractions;

namespace Pokemon.Infraestructure.Repositories;

public class PokemonRepository : Repository<Domain.Entities.Pokemon>, IPokemonRepository
{
    public PokemonRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async override Task<List<Domain.Entities.Pokemon>> GetAll()
    {
        return await Context.Pokemons.Include(c => c.PokemonTipo).ToListAsync();
    }

    public async override Task<Domain.Entities.Pokemon?> GetById(int? id)
    {
        return await Context.Pokemons.Include(c => c.PokemonTipo).Where(c => c.Id == id).FirstOrDefaultAsync();
    }
}