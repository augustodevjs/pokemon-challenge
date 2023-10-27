using FluentValidation;
using Pokemon.Domain.Entities;

namespace Pokemon.Domain.Validators;

public class PokemonTipoValidator : AbstractValidator<PokemonTipo>
{
    public PokemonTipoValidator()
    {
        RuleFor(pokemon => pokemon.Nome)
            .NotEmpty()
            .WithMessage("O nome é obrigatório.")
            .MaximumLength(50)
            .WithMessage("O nome deve ter menos de 50 caracteres.");
    }
}