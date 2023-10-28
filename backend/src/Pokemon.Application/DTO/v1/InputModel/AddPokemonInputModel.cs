namespace Pokemon.Application.DTO.v1.InputModel;

public class AddPokemonInputModel
{
    public int PokemonTipoId { get; set; }
    public string Nome { get; set; } = null!;
    public string ImagemUrl { get; set; } = null!;
    public string Descricao { get; set; } = null!;
}