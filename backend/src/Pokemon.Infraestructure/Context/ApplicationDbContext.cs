using System.Reflection;
using Pokemon.Domain.Entities;
using FluentValidation.Results;
using Pokemon.Domain.Contracts;
using Microsoft.EntityFrameworkCore;
using Pokemon.Infraestructure.Extensions;

namespace Pokemon.Infraestructure.Context;

public class ApplicationDbContext : DbContext, IUnityOfWork
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    
    public DbSet<PokemonTipo> PokemonTipos { get; set; } = null!;
    public DbSet<Domain.Entities.Pokemon> Pokemons { get; set; } = null!;

    public async Task<bool> Commit() => await SaveChangesAsync() > 0;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        ApplyConfigurations(modelBuilder);
        base.OnModelCreating(modelBuilder);
    }

    private static void ApplyConfigurations(ModelBuilder modelBuilder)
    {
        modelBuilder.Ignore<ValidationResult>();
        modelBuilder.ApplyEntityConfiguration();
    }
}