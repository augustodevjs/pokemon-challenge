using FluentValidation.Results;
using Pokemon.Domain.Validators;

namespace Pokemon.Domain.Entities;

public class PokemonTipo : Entity
{
    public string Nome { get; set; } = null!;
    public List<Pokemon> Pokemons { get; set; } = new();
    
    public override bool Validar(out ValidationResult validationResult)
    {
        validationResult = new PokemonTipoValidator().Validate(this);
        return validationResult.IsValid;
    }
}