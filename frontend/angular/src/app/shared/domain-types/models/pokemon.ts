import { PokemonTipoViewModel } from ".";

export interface PokemonViewModel {
  id: number;
  nome: string;
  imagemUrl: string;
  descricao: string;
  pokemonTipo: PokemonTipoViewModel;
}

export interface AddPokemonInputModel {
  pokemonTipoId: number;
  nome: string;
  imagemUrl: string;
  descricao: string;
}

export interface AddPokemonViewModel {
  id: number;
  pokemonTipoId: number;
  nome: string;
  imagemUrl: string;
  descricao: string;
}

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