using Pokemon.Application.DTO.v1.ViewModel;
using Pokemon.Application.Services;
using Pokemon.Application.Tests.Fixtures;
using Pokemon.Domain.Contracts.Repository;

namespace Pokemon.Application.Tests.Services;

public class PokemonTipoServiceTests : BaseServiceTest, IClassFixture<ServicesFixtures>
{
    private readonly PokemonTipoService _pokemonTipoService;

    public PokemonTipoServiceTests(ServicesFixtures servicesFixtures)
    {
        Mock<IPokemonTipoRepository> pokemonTipoRepositoryMock = new();
        _pokemonTipoService = new PokemonTipoService(
            servicesFixtures.Mapper,
            NotificatorMock.Object,
            pokemonTipoRepositoryMock.Object
        );
    }

    [Fact]
    public async Task GetAll_ReturnListOfPokemonTipoViewModel()
    {
        // Act
        var allPokemonsTypes = await _pokemonTipoService.GetAll();

        // Assert
        using (new AssertionScope())
        {
            allPokemonsTypes.Should().NotBeNull();
            allPokemonsTypes.Should().BeOfType<List<PokemonTipoViewModel>>();
        }
    }
}