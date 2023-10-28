import { AddPokemonInputModel, AddPokemonViewModel, FormPokemonAddInputModel, FormPokemonUpdateInputModel, PokemonViewModel, UpdatePokemonInputModel, UpdatePokemonViewModel } from "..";

export const FormPokemonToAddPokemon = (pokemon: FormPokemonAddInputModel): AddPokemonInputModel => {
  return {
    nome: pokemon.nome,
    descricao: pokemon.descricao,
    imagemUrl: pokemon.imagemUrl,
    pokemonTipoId: pokemon.pokemonTipo.value
  }
}

export const FormPokemonAddToPokemonViewModel = (pokemon: AddPokemonViewModel, form: FormPokemonAddInputModel): PokemonViewModel => {
  return {
    id: pokemon.id,
    descricao: pokemon.descricao,
    imagemUrl: pokemon.imagemUrl,
    nome: pokemon.nome,
    pokemonTipo: {
      id: form.pokemonTipo.value,
      nome: form.pokemonTipo.label
    }
  }
}

export const FormPokemonToUpdatePokemon = (pokemon: FormPokemonUpdateInputModel, id: number): UpdatePokemonInputModel => {
  return {
    id,
    nome: pokemon.nome,
    descricao: pokemon.descricao,
    imagemUrl: pokemon.imagemUrl,
    pokemonTipoId: pokemon.pokemonTipo.value
  }
}

export const FormPokemonUpdateToPokemonViewModel = (pokemon: UpdatePokemonViewModel, form: FormPokemonUpdateInputModel): PokemonViewModel => {
  return {
    id: form.id,
    descricao: pokemon.descricao,
    imagemUrl: pokemon.imagemUrl,
    nome: pokemon.nome,
    pokemonTipo: {
      id: form.pokemonTipo.value,
      nome: form.pokemonTipo.label
    }
  }
}