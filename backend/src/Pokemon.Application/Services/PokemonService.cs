﻿using AutoMapper;
using Pokemon.Core.Enums;
using Pokemon.Application.Notifications;
using Pokemon.Domain.Contracts.Repository;
using Pokemon.Application.DTO.v1.ViewModel;
using Pokemon.Application.DTO.v1.InputModel;
using Pokemon.Application.Contracts.Services;

namespace Pokemon.Application.Services;

public class PokemonService : BaseService, IPokemonService
{
    private readonly IPokemonRepository _pokemonRepository;

    public PokemonService(IMapper mapper, INotificator notificator, IPokemonRepository pokemonRepository) : base(mapper,
        notificator)
    {
        _pokemonRepository = pokemonRepository;
    }

    public async Task<List<PokemonViewModel>> GetAll()
    {
        var getAllPokemons = await _pokemonRepository.GetAll();
        return Mapper.Map<List<PokemonViewModel>>(getAllPokemons);
    }

    public async Task<List<PokemonViewModel>?> GetAllByPokemonTipo(int id)
    {
        if (!Enum.IsDefined(typeof(EPokemonTipo), id))
        {
            Notificator.HandleNotFoundResource();
            return null;
        }

        var pokemonsByType = await _pokemonRepository.getPokemonsByPokemonTipo(id);
        return Mapper.Map<List<PokemonViewModel>>(pokemonsByType);
    }

    public async Task<PokemonViewModel?> GetById(int id)
    {
        var getPokemon = await _pokemonRepository.GetById(id);

        if (getPokemon != null) return Mapper.Map<PokemonViewModel>(getPokemon);

        Notificator.HandleNotFoundResource();
        return null;
    }

    public async Task<AddPokemonViewModel?> Create(AddPokemonInputModel inputModel)
    {
        var pokemon = Mapper.Map<Domain.Entities.Pokemon>(inputModel);

        if (!await Validate(pokemon)) return null;

        _pokemonRepository.Create(pokemon);

        if (await _pokemonRepository.UnityOfWork.Commit())
            return Mapper.Map<AddPokemonViewModel>(pokemon);

        Notificator.Handle("Não foi possível cadastrar o pokemon.");
        return null;
    }

    public async Task<UpdatePokemonViewModel?> Update(int id, UpdatePokemonInputModel inputModel)
    {
        if (id != inputModel.Id)
        {
            Notificator.Handle("Os ids não conferem");
            return null;
        }

        var getPokemon = await _pokemonRepository.GetById(id);

        if (getPokemon == null)
        {
            Notificator.HandleNotFoundResource();
            return null;
        }

        var result = Mapper.Map(inputModel, getPokemon);

        if (!await Validate(getPokemon)) return null;

        _pokemonRepository.Update(getPokemon);

        if (await _pokemonRepository.UnityOfWork.Commit())
            return Mapper.Map<UpdatePokemonViewModel>(result);

        Notificator.Handle("Não foi possível atualizar o pokemon.");
        return null;
    }

    public async Task Delete(int id)
    {
        var getPokemon = await _pokemonRepository.GetById(id);

        if (getPokemon == null)
        {
            Notificator.HandleNotFoundResource();
            return;
        }

        _pokemonRepository.Delete(getPokemon);

        if (!await _pokemonRepository.UnityOfWork.Commit())
        {
            Notificator.Handle("Não foi possível remover o pokemon.");
        }
    }

    private async Task<bool> Validate(Domain.Entities.Pokemon pokemon)
    {
        if (!pokemon.Validar(out var validationResult))
        {
            Notificator.Handle(validationResult.Errors);
            return false;
        }

        if (!Enum.IsDefined(typeof(EPokemonTipo), pokemon.PokemonTipoId))
        {
            Notificator.Handle("O pokemón deve ter um tipo válido.");
        }

        var existingPokemonName =
            await _pokemonRepository.FirstOrDefault(u => u.Nome == pokemon.Nome && u.Id != pokemon.Id);

        if (existingPokemonName != null)
        {
            Notificator.Handle("Já existe um pokemon com esse nome.");
        }

        return !Notificator.HasNotification;
    }
}