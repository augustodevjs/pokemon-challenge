import Swal from "sweetalert2";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PokemonService, PokemonTipoService } from '../../shared/services';
import { PokemonTipoViewModel, PokemonViewModel } from '../../shared/domain-types';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
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
  text: string = "Listagem de Pokemons";

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
      nome: [''],
      pokemontipo: [''],
    })
  }

  filter() {
    const buscar = {
      pokemontipoid: this.formFilter.controls['pokemontipo'].value
    }

    this.searchPokemonByType(buscar.pokemontipoid);
  }

  clearFilter() {
    if (this.formFilter.controls['pokemontipo'].value) {
      this.formFilter.reset();
      this.formFilter.controls['pokemontipo'].setValue('');
      this.getPokemons();
    }
  }

  open() {
    const modalRef = this.modal.open(AddPokemonModalComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.cadastroSucessoEnviado.subscribe((success: boolean) => {
      if (success) {
        this.getPokemons();
      }
    });
  }

  openDetailsModal(id: number) {
    const modalRef = this.modal.open(EditPokemonModalComponent);
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
            error: (err: HttpErrorResponse) => {
              console.error(err);
            }
          });
        }
      })
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
        this.pokemons = value;
      },
      error: err => {
        console.log(err)
      }
    });
  }
}
