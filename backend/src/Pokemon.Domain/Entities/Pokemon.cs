using FluentValidation.Results;
using Pokemon.Domain.Validators;

namespace Pokemon.Domain.Entities;

public class Pokemon: Entity
{
    public int PokemonTypeId { get; set; }
    public string Name { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public string Description { get; set; } = null!;

    public PokemonTipo PokemonTipo { get; set; } = null!;

    public override bool Validar(out ValidationResult validationResult)
    {
        validationResult = new PokemonValidator().Validate(this);
        return validationResult.IsValid;
    }
}