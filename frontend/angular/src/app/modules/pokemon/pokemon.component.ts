import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PokemonService, PokemonTipoService } from '../../shared/services';
import { PokemonTipoViewModel, PokemonViewModel } from '../../shared/domain-types';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/register/register.component';
import { DetailsComponent } from './components/details/details.component';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  pokemonId: number = 0;
  formFilter!: FormGroup;
  pokemons: PokemonViewModel[] = [];
  pokemonTipos: PokemonTipoViewModel[] = [];
  valorHeader: string = "Bem vindo treinador!";

  constructor(
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private sercvicePokemon: PokemonService,
    private servicePokemonTipo: PokemonTipoService,
  ) { }

  ngOnInit(): void {
    this.getPokemons();
    this.getFormSearch();
    this.getPokemonsTipos();
  }

  private getFormSearch() {
    this.formFilter = this.formBuilder.group({
      nome: [null],
      pokemontipo: [null],
    })
  }

  filter() {
    const buscar = {
      pokemontipoid: this.formFilter.controls['pokemontipo'].value
    }

    this.searchPokemonByType(buscar.pokemontipoid);
  }

  formatarTexto(texto: string): string {
    const textoSemAcentos = _.deburr(texto);
    return textoSemAcentos.toLowerCase();
  }

  clearFilter() {
    this.formFilter.reset();
    this.getPokemons();
  }

  open() {
    const modalRef = this.modal.open(RegisterComponent);
    modalRef.componentInstance.cadastroSucessoEnviado.subscribe((success: boolean) => {
      if (success) {
        this.getPokemons();
      }
    });
  }

  openDetailsModal(id: number) {
    const modalRef = this.modal.open(DetailsComponent);
    modalRef.componentInstance.pokemonId = this.pokemonId = id;
    modalRef.componentInstance.updateSucessoEnviado.subscribe((success: boolean) => {
      if (success) {
        this.getPokemons();
      }
    });
    modalRef.componentInstance.removeSucessoEnviado.subscribe((success: boolean) => {
      if (success) {
        this.getPokemons();
      }
    });
  }

  private searchPokemonByType(tipo: number) {
    this.sercvicePokemon.getAllByPokemonType(tipo).subscribe({
      next: value => {
        return this.pokemons = value;
      },
      error: err => {
        console.log(err)
      }
    });
  }

  private getPokemonsTipos() {
    this.servicePokemonTipo.getAll().subscribe({
      next: value => {
        this.pokemonTipos = value;
      },
      error: err => {
        console.log(err)
      }
    });
  }

  private getPokemons() {
    this.sercvicePokemon.getAll().subscribe({
      next: value => {
        console.log(value)
        this.pokemons = value;
      },
      error: err => {
        console.log(err)
      }
    });
  }
}
