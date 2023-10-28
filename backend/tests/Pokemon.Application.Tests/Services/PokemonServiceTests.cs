using System.Linq.Expressions;
using Pokemon.Application.DTO.v1.InputModel;
using Pokemon.Application.DTO.v1.ViewModel;
using Pokemon.Application.Services;
using Pokemon.Application.Tests.Fixtures;
using Pokemon.Domain.Contracts.Repository;
using PokemonEntity = Pokemon.Domain.Entities.Pokemon;

namespace Pokemon.Application.Tests.Services;

public class PokemonServiceTests : BaseServiceTest, IClassFixture<ServicesFixtures>
{
    private readonly PokemonService _pokemonService;
    private readonly Mock<IPokemonRepository> _pokemonRepositoryMock;

    public PokemonServiceTests(ServicesFixtures servicesFixtures)
    {
        _pokemonRepositoryMock = new Mock<IPokemonRepository>();
        _pokemonService = new PokemonService(
            servicesFixtures.Mapper,
            NotificatorMock.Object,
            _pokemonRepositoryMock.Object
        );
    }

    #region allPokemons

    [Fact]
    public async Task GetAll_ReturnListOfPokemonViewModel()
    {
        // Act
        var allPokemons = await _pokemonService.GetAll();

        // Assert
        using (new AssertionScope())
        {
            allPokemons.Should().NotBeNull();
            allPokemons.Should().BeOfType<List<PokemonViewModel>>();
        }
    }

    #endregion

    #region getById

    [Fact]
    public async Task GetById_PokemonExistent_ReturnPokemonViewModel()
    {
        // Arrange
        SetupMocks();

        // Act
        var pokemonService = await _pokemonService.GetById(1);

        // Assert
        using (new AssertionScope())
        {
            NotFound.Should().BeFalse();
            pokemonService.Should().NotBeNull();
            pokemonService.Should().BeOfType<PokemonViewModel>();
            NotificatorMock.Verify(c => c.HandleNotFoundResource(), Times.Never);
            _pokemonRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);
        }
    }
    
    [Fact]
    public async Task GetById_PokemonNotExistent_ReturnNotFoundResource()
    {
        // Arrange
        SetupMocks();

        // Act
        var pokemonService = await _pokemonService.GetById(2);

        // Assert
        using (new AssertionScope())
        {
            pokemonService.Should().BeNull();
            NotFound.Should().BeTrue();
            NotificatorMock.Verify(c => c.HandleNotFoundResource(), Times.Once);
            _pokemonRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);
        }
    }

    #endregion

    #region create

    [Fact]
    public async Task Create_Pokemon_ReturnPokemonViewModel()
    {
        // Arrange
        SetupMocks(false);

        var pokemonInputModel = new AddPokemonInputModel
        {
            Nome = "John",
            Descricao = "Descricao",
            ImagemUrl = "image",
            PokemonTipoId = 1
        };

        // Act
        var pokemonService = await _pokemonService.Create(pokemonInputModel);

        // Assert
        using (new AssertionScope())
        {
            pokemonService.Should().NotBeNull();
            Erros.Should().BeEmpty();
            _pokemonRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Never);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
        }
    }
    
    [Fact]
    public async Task Create_Pokemon_HandleErrorValidation()
    {
        // Arrange
        SetupMocks(false);
        var pokemonInputModel = new AddPokemonInputModel();

        // Act
        var pokemonService = await _pokemonService.Create(pokemonInputModel);

        // Assert
        using (new AssertionScope())
        {
            pokemonService.Should().BeNull();
            Erros.Should().NotBeEmpty();
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Once);
        }
    }
    
    [Fact]
    public async Task Create_Pokemon_HandleErrorUnityOfWorkCommit()
    {
        // Arrange
        SetupMocks(false, false);

        var pokemonInputModel = new AddPokemonInputModel
        {
            Nome = "John",
            Descricao = "Descricao",
            ImagemUrl = "image",
            PokemonTipoId = 1
        };

        // Act
        var pokemonService = await _pokemonService.Create(pokemonInputModel);

        // Assert
        using (new AssertionScope())
        {
            pokemonService.Should().BeNull();
            Erros.Should().NotBeEmpty();
            Erros.Should().Contain("Não foi possível cadastrar o pokemon.");
            _pokemonRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
        }
    }
    
    [Fact]
    public async Task Create_Pokemon_ReturnHandleErrorPokemonNameAlreadyExist()
    {
        // Arrange
        SetupMocks(true, false);

        var pokemonInputModel = new AddPokemonInputModel
        {
            Nome = "John",
            Descricao = "Descricao",
            ImagemUrl = "image",
            PokemonTipoId = 1
        };

        // Act
        var pokemonService = await _pokemonService.Create(pokemonInputModel);

        // Assert
        using (new AssertionScope())
        {
            pokemonService.Should().BeNull();
            Erros.Should().NotBeEmpty();
            Erros.Should().Contain("Já existe um pokemon com esse nome.");
            _pokemonRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Never);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
        }
    }
    
        
    [Fact]
    public async Task Create_Pokemon_ReturnHandleErrorTypeInvalidPokemon()
    {
        // Arrange
        SetupMocks(false);

        var pokemonInputModel = new AddPokemonInputModel
        {
            Nome = "John",
            Descricao = "Descricao",
            ImagemUrl = "image",
            PokemonTipoId = 99
        };

        // Act
        var pokemonService = await _pokemonService.Create(pokemonInputModel);

        // Assert
        using (new AssertionScope())
        {
            pokemonService.Should().BeNull();
            Erros.Should().NotBeEmpty();
            Erros.Should().Contain("O pokemón deve ter um tipo válido.");
            _pokemonRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Never);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
        }
    }

    #endregion

    #region delete

    [Fact]
    public async Task Delete_Pokemon()
    {
        // Arrange
        SetupMocks();

        // Act
        await _pokemonService.Delete(1);

        // Assert
        using (new AssertionScope())
        {
            Erros.Should().BeEmpty();
            _pokemonRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);
            _pokemonRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Once);
        }
    }
    
    [Fact]
    public async Task Delete_Pokemon_ReturnHandleNotFoundResource()
    {
        // Arrange
        SetupMocks();

        // Act
        await _pokemonService.Delete(2);

        // Assert
        using (new AssertionScope())
        {
            NotFound.Should().BeTrue();
            NotificatorMock.Verify(c => c.HandleNotFoundResource(), Times.Once);
            _pokemonRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);
            _pokemonRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Never);
        }
    }
    
    [Fact]
    public async Task Delete_Pokemon_ReturnErrorUnitOfWorkCommit()
    {
        // Arrange
        SetupMocks(true, false, false);
    
        // Act
        await _pokemonService.Delete(1);
    
        // Assert
        using (new AssertionScope())
        {
            Erros.Should().NotBeEmpty();
            Erros.Should().Contain("Não foi possível remover o pokemon.");
            _pokemonRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);
            _pokemonRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Once);
        }
    }

    #endregion
    
    #region mock

    private void SetupMocks(bool firstDefaultAssignment = true, bool commit = true,
        bool getAllPokemons = true)
    {
        var pokemon = new PokemonEntity() { Id = 1 };

        var pokemons = new List<PokemonEntity>
        {
            new()
            {
                Id = 1,
            }
        };

        _pokemonRepositoryMock.Setup(c => c.GetAll())
            .ReturnsAsync(getAllPokemons ? pokemons : new List<PokemonEntity>());

        _pokemonRepositoryMock
            .Setup(c => c.GetById(It.Is<int>(x => x == 1)))
            .ReturnsAsync(pokemon);

        _pokemonRepositoryMock
            .Setup(c => c.GetById(It.Is<int>(x => x != 1)))
            .ReturnsAsync(null as PokemonEntity);

        _pokemonRepositoryMock.Setup(c => c.FirstOrDefault(It.IsAny<Expression<Func<PokemonEntity, bool>>>()))
            .ReturnsAsync(firstDefaultAssignment ? pokemon : null);

        _pokemonRepositoryMock.Setup(c => c.UnityOfWork.Commit()).ReturnsAsync(commit);
    }

    #endregion
}