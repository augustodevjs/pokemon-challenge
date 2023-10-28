import { AddPokemonInputModel, AddPokemonViewModel, FormPokemonInputModel, PokemonViewModel } from "..";

export const FormPokemonToAddPokemon = (pokemon: FormPokemonInputModel): AddPokemonInputModel => {
  return {
    nome: pokemon.nome,
    descricao: pokemon.descricao,
    imagemUrl: pokemon.imagemUrl,
    pokemonTipoId: pokemon.pokemonTipo.value
  }
}

export const FormPokemonToPokemonViewModel = (pokemon: AddPokemonViewModel, form: FormPokemonInputModel): PokemonViewModel => {
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