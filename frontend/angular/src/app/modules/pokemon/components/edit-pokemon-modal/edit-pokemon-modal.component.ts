import Swal from "sweetalert2";
import { NgForOf, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { PokemonService, PokemonTipoService } from '../../../../shared/services';
import { PokemonTipoViewModel, PokemonViewModel, UpdatePokemonInputModel } from '../../../../shared/domain-types';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './edit-pokemon-modal.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./edit-pokemon-modal.component.scss']
})
export class EditPokemonModalComponent implements OnInit {
  form!: FormGroup;
  pokemon!: PokemonViewModel;
  @Input() pokemonId!: number;
  pokemonTipo!: PokemonTipoViewModel[];
  @Output() updateSucessoEnviado: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() removeSucessoEnviado: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private pokemonService: PokemonService,
    private pokemonTipoService: PokemonTipoService,
  ) { }

  ngOnInit(): void {
    this.getPokemonTipos();
    this.setupForm();
  }

  private setupForm() {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      pokemontipo: [null, [Validators.required]],
      descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      imagem: []
    });

    this.pokemonService.loadById(this.pokemonId).subscribe({
      next: value => {
        this.pokemon = value;
        this.iniciateFormPokemon();
      },
    });
  }


  onSubmit() {
    if (this.form.valid) {
      const pokemon: UpdatePokemonInputModel = {
        id: this.pokemonId,
        nome: this.form.controls['nome'].value,
        descricao: this.form.controls['descricao'].value,
        pokemonTipoId: this.form.controls['pokemontipo'].value,
        imagemUrl: this.form.controls['imagem'].value,
      };

      this.pokemonService.update(this.pokemonId, pokemon).subscribe({
        next: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Pokemón atualizado com sucesso!',
            showConfirmButton: true,
            returnFocus: false,
            customClass: {
              popup: 'popup-sweet-alert-background',
              title: 'title-sweet-alert',
              confirmButton: 'confirm-button-sweet-alert',
              htmlContainer: 'html-sweet-alert',
            },
          }).then((result) => {
            if (result.isConfirmed) {
              this.updateSucessoEnviado.emit(true);
              this.activeModal.close('Submit click');
            }
          });
        },
        error: (err: HttpErrorResponse) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            text: `${err.error.erros[0]}`,
            title: `${err.error.title}`,
            showConfirmButton: true,
            returnFocus: false,
            customClass: {
              popup: 'popup-sweet-alert-background',
              title: 'title-sweet-alert',
              confirmButton: 'confirm-button-sweet-alert',
              htmlContainer: 'html-sweet-alert',
            },
          }).then((result) => {
            if (result.isConfirmed) {
              this.form.controls['pokemontipo'].setValue('');
            }
          })
        }
      });
    } else {
      this.verificateValidationErros();
    }
  }

  verificateValidTouched(campo: string) {
    return !this.form.get(campo)?.valid && (this.form.get(campo)?.touched || this.form.get(campo)?.dirty);
  }

  getErrors(controlName: string): string[] {
    const control = this.form.get(controlName);
    const errors: string[] = [];

    if (control?.errors) {
      for (const errorKey in control.errors) {
        if (errorKey === 'required') {
          errors.push('Campo obrigatório.');
        } else if (errorKey === 'minlength') {
          errors.push(`${controlName} deve ter pelo menos ${control.errors[errorKey].requiredLength} caracteres.`);
        } else if (errorKey === 'maxlength') {
          errors.push(`${controlName} der no máximo ${control.errors[errorKey].requiredLength} caracteres.`);
        }
      }
    }

    return errors;
  }

  private verificateValidationErros() {
    Object.keys(this.form.controls).forEach((campo) => {
      const controle = this.form.get(campo);
      if (controle instanceof FormGroup) {
        controle?.markAsDirty();
        this.verificateValidationErros()
      } else {
        controle?.markAsDirty();
      }
    });
  }

  private getPokemonTipos() {
    this.pokemonTipoService.getAll().subscribe({
      next: value => {
        this.pokemonTipo = value;
      },
    });
  }

  private iniciateFormPokemon() {
    if (this.pokemon) {
      this.form.setValue({
        nome: this.pokemon.nome,
        pokemontipo: this.pokemon.pokemonTipo.id,
        descricao: this.pokemon.descricao,
        imagem: this.pokemon.imagemUrl
      });
    }
  }
}
