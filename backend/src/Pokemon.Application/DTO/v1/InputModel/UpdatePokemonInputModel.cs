using Pokemon.Application.DTO.v1.ViewModel;

namespace Pokemon.Application.DTO.v1.InputModel;

public class UpdatePokemonInputModel : Base
{
    public string Nome { get; set; } = null!;
    public string Imagem { get; set; } = null!;
    public string Descricao { get; set; } = null!;
    public PokemonTipoViewModel PokemonTipo { get; set; } = null!;
}