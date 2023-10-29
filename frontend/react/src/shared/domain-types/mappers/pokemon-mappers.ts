import { AddPokemonInputModel, AddPokemonViewModel, FormPokemonInputModel, PokemonViewModel, UpdatePokemonInputModel, UpdatePokemonViewModel } from "..";

export const FormPokemonToAddPokemon = (pokemon: FormPokemonInputModel): AddPokemonInputModel => {
  return {
    nome: pokemon.nome,
    descricao: pokemon.descricao,
    imagemUrl: pokemon.imagemUrl,
    pokemonTipoId: pokemon.pokemonTipo.id
  }
}

export const FormPokemonAddToPokemonViewModel = (pokemon: AddPokemonViewModel, form: FormPokemonInputModel): PokemonViewModel => {
  return {
    id: pokemon.id,
    descricao: pokemon.descricao,
    imagemUrl: pokemon.imagemUrl,
    nome: pokemon.nome,
    pokemonTipo: {
      id: form.pokemonTipo.id,
      nome: form.pokemonTipo.nome
    }
  }
}

export const FormPokemonToUpdatePokemon = (pokemon: FormPokemonInputModel, id: number): UpdatePokemonInputModel => {
  return {
    id,
    nome: pokemon.nome,
    descricao: pokemon.descricao,
    imagemUrl: pokemon.imagemUrl,
    pokemonTipoId: pokemon.pokemonTipo.id
  }
}

export const FormPokemonUpdateToPokemonViewModel = (form: FormPokemonInputModel, response: UpdatePokemonViewModel, id: number): PokemonViewModel => {
  return {
    id,
    descricao: response.descricao,
    imagemUrl: response.imagemUrl,
    nome: response.nome,
    pokemonTipo: {
      id: form.pokemonTipo.id,
      nome: form.pokemonTipo.nome
    }
  }
}