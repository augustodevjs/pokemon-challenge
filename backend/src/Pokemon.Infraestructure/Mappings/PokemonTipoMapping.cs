using Pokemon.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pokemon.Infraestructure.Mappings;

public class PokemonTipoMapping : IEntityTypeConfiguration<PokemonTipo>
{
    public void Configure(EntityTypeBuilder<PokemonTipo> builder)
    {
        builder.Property(p => p.Nome)
            .HasColumnType("VARCHAR(50)");

        builder
            .Property(p => p.CreatedAt)
            .ValueGeneratedOnAdd()
            .HasColumnType("DATETIME");

        builder
            .Property(p => p.UpdatedAt)
            .ValueGeneratedOnAddOrUpdate()
            .HasColumnType("DATETIME");

        builder
            .HasMany(p => p.Pokemons)
            .WithOne(p => p.PokemonTipo)
            .HasForeignKey(p => p.PokemonTypeId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}