using FluentValidation.Results;
using Pokemon.Domain.Validators;

namespace Pokemon.Domain.Entities;

public class Pokemon: Entity
{
    public int PokemonTipoId { get; set; }
    public string Nome { get; set; } = null!;
    public string ImagemUrl { get; set; } = null!;
    public string Descricao { get; set; } = null!;
    public PokemonTipo PokemonTipo { get; set; } = null!;
    
    public override bool Validar(out ValidationResult validationResult)
    {
        validationResult = new PokemonValidator().Validate(this);
        return validationResult.IsValid;
    }
}