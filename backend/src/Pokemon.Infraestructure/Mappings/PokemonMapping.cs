using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Pokemon.Infraestructure.Mappings;

public class PokemonMapping : IEntityTypeConfiguration<Domain.Entities.Pokemon>
{
    public void Configure(EntityTypeBuilder<Domain.Entities.Pokemon> builder)
    {
        builder.Property(p => p.Nome)
            .IsRequired()
            .HasColumnType("VARCHAR(50)");
        
        builder.Property(p => p.Descricao)
            .IsRequired()
            .HasColumnType("VARCHAR(150)");
        
        builder.Property(p => p.PokemonTipoId)
            .IsRequired();
        
        builder
            .Property(p => p.CreatedAt)
            .ValueGeneratedOnAdd()
            .HasColumnType("DATETIME");

        builder
            .Property(p => p.UpdatedAt)
            .ValueGeneratedOnAddOrUpdate()
            .HasColumnType("DATETIME");
    }
}