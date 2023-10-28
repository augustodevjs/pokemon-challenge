using FluentValidation;

namespace Pokemon.Domain.Validators
{
    public class PokemonValidator : AbstractValidator<Entities.Pokemon>
    {
        public PokemonValidator()
        {
            RuleFor(pokemon => pokemon.ImagemUrl)
                .NotEmpty()
                .WithMessage("A URL da imagem é obrigatória.");

            RuleFor(pokemon => pokemon.PokemonTipoId)
                .NotNull()
                .WithMessage("O tipo do Pokemon é obrigatório.");

            RuleFor(pokemon => pokemon.Nome)
                .NotEmpty()
                .WithMessage("O nome é obrigatório.")
                .MaximumLength(50)
                .WithMessage("O nome deve ter menos de 50 caracteres.");

            RuleFor(pokemon => pokemon.Descricao)
                .NotEmpty()
                .WithMessage("A descrição é obrigatória.")
                .MaximumLength(150)
                .WithMessage("A descrição deve ter menos de 150 caracteres.");
        }
    }
}