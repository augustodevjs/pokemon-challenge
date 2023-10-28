using Pokemon.Application.DTO.v1.ViewModel;
using Pokemon.Application.Services;
using Pokemon.Application.Tests.Fixtures;
using Pokemon.Domain.Contracts.Repository;

namespace Pokemon.Application.Tests.Services;

public class PokemonTipoServiceTests : BaseServiceTest, IClassFixture<ServicesFixtures>
{
    private readonly PokemonTipoService _pokemonTipoService;
    private readonly Mock<IPokemonTipoRepository> _pokemonTipoRepositoryMock;

    public PokemonTipoServiceTests(ServicesFixtures servicesFixtures)
    {
        _pokemonTipoRepositoryMock = new Mock<IPokemonTipoRepository>();
        _pokemonTipoService = new PokemonTipoService(
            servicesFixtures.Mapper,
            NotificatorMock.Object,
            _pokemonTipoRepositoryMock.Object
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