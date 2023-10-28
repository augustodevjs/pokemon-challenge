namespace Pokemon.Application.DTO.v1.ViewModel;

public class AddPokemonViewModel : Base
{
    public int PokemonTipoId { get; set; }
    public string Nome { get; set; } = null!;
    public string ImagemUrl { get; set; } = null!;
    public string Descricao { get; set; } = null!;
}