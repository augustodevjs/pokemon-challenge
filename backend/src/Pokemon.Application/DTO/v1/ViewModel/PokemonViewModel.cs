namespace Pokemon.Application.DTO.v1.ViewModel;

public class PokemonViewModel : Base
{
    public string Nome { get; set; } = null!;
    public string ImagemUrl { get; set; } = null!;
    public string Descricao { get; set; } = null!;
    public PokemonTipoViewModel PokemonTipo { get; set; } = null!;
}