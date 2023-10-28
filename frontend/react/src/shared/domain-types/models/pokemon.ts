import { PokemonTipo } from ".";

export interface Pokemon {
  id: number;
  nome: string;
  imagemUrl: string;
  descricao: string;
  pokemonTipo: PokemonTipo;
}

// Add Pokemon
export interface AddPokemonInputModel {
  pokemonTipoId: number;
  nome: string;
  imagemUrl: string;
  descricao: string;
}

export interface AddPokemonViewModel {
  pokemonTipoId: number;
  nome: string;
  imagemUrl: string;
  descricao: string;
}

// Update Pokemon
export interface UpdatePokemonInputModel {
  id: number;
  pokemonTipoId: number;
  nome: string;
  imagemUrl: string;
  descricao: string;
}

export interface UpdatePokemonViewModel {
  pokemonTipoId: number;
  nome: string;
  imagemUrl: string;
  descricao: string;
}