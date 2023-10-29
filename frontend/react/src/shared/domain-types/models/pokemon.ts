import { PokemonTipoViewModel } from ".";
import { SelectOption } from "../..";

export interface PokemonViewModel {
  id: number;
  nome: string;
  imagemUrl: string;
  descricao: string;
  pokemonTipo: PokemonTipoViewModel;
}

// Add Pokemon
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

// Form
export interface FormPokemonInputModel {
  pokemonTipo: PokemonTipoViewModel;
  nome: string;
  imagemUrl: string;
  descricao: string;
}

export interface FormPokemonAddInputModel {
  pokemonTipo: PokemonTipoViewModel;
  nome: string;
  imagemUrl: string;
  descricao: string;
}

export interface FormPokemonUpdateInputModel {
  id: number;
  pokemonTipo: SelectOption;
  nome: string;
  imagemUrl: string;
  descricao: string;
}