import Swal from "sweetalert2";
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PokemonService, PokemonTipoService } from '../../shared/services';
import { PokemonTipoViewModel, PokemonViewModel } from '../../shared/domain-types';

import { AddPokemonModalComponent } from "./components/add-pokemon-modal/add-pokemon-modal.component";
import { EditPokemonModalComponent } from "./components/edit-pokemon-modal/edit-pokemon-modal.component";

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

  constructor(
    private modal: NgbModal,
    private formBuilder: FormBuilder,
    private sercvicePokemon: PokemonService,
    private servicePokemonTipo: PokemonTipoService,
  ) { }

  ngOnInit(): void {
    this.getPokemons();
    this.setupForm();
    this.getPokemonsTipos();
  }

  setupForm() {
    this.formFilter = this.formBuilder.group({
      nome: [''],
      pokemontipo: [''],
    })
  }

  filter() {
    this.searchPokemonByTypeIfNeeded();
  }

  clearFilter() {
    if (this.formFilter.controls['pokemontipo'].value) {
      this.formFilter.reset();
      this.formFilter.controls['pokemontipo'].setValue('');
      this.getPokemons();
    }
  }

  openAddModal() {
    const modalRef = this.modal.open(AddPokemonModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.cadastroSucessoEnviado.subscribe((success: boolean) => {
      if (success) {
        this.getPokemons();
      }
    });
  }

  openEditModal(id: number) {
    const modalRef = this.modal.open(EditPokemonModalComponent);
    modalRef.componentInstance.pokemonId = this.pokemonId = id;
    modalRef.componentInstance.updateSucessoEnviado.subscribe(this.handleSuccess.bind(this));
    modalRef.componentInstance.removeSucessoEnviado.subscribe(this.handleSuccess.bind(this));
  }

  removePokemon(id: number) {
    Swal.fire({
      title: 'Você tem certeza que deseja remover o pokemon?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: "Fechar",
      customClass: {
        popup: 'popup-sweet-alert-background',
        title: 'title-sweet-alert',
        confirmButton: 'confirm-button-sweet-alert',
        htmlContainer: 'html-sweet-alert',
      },
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.sercvicePokemon.remove(id).subscribe({
            next: () => {
              this.getPokemons();
              Swal.fire(
                {
                  title: 'Pokemon removido com sucesso!',
                  icon: 'success',
                  showConfirmButton: true,
                  customClass: {
                    popup: 'popup-sweet-alert-background',
                    title: 'title-sweet-alert',
                    confirmButton: 'confirm-button-sweet-alert',
                    htmlContainer: 'html-sweet-alert',
                  },
                }
              )
            },
          });
        }
      })
  }

  private handleSuccess(success: boolean) {
    if (success) {
      this.getPokemons();
    }
  }

  private searchPokemonByTypeIfNeeded() {
    const tipo = this.formFilter.controls['pokemontipo'].value;
    if (tipo) {
      this.searchPokemonByType(tipo);
    }
  }

  private searchPokemonByType(tipo: number) {
    this.sercvicePokemon.getAllByPokemonType(tipo).subscribe({
      next: value => {
        this.pokemons = value;
      }
    });
  }

  private getPokemons() {
    this.sercvicePokemon.getAll().subscribe({
      next: value => {
        this.pokemons = value;
      },
    });
  }

  private getPokemonsTipos() {
    this.servicePokemonTipo.getAll().subscribe({
      next: value => {
        this.pokemonTipos = value;
      },
    });
  }
}
