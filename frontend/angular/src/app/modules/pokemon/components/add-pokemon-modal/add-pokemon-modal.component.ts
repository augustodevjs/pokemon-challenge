import Swal from 'sweetalert2'
import { NgForOf, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { PokemonService, PokemonTipoService } from '../../../../shared/services';
import { AddPokemonInputModel, PokemonTipoViewModel } from '../../../../shared/domain-types';

@Component({
  selector: 'app-add-pokemon-modal',
  standalone: true,
  templateUrl: './add-pokemon-modal.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./add-pokemon-modal.component.scss']
})
export class AddPokemonModalComponent implements OnInit {
  form!: FormGroup;
  pokemonTipos: PokemonTipoViewModel[] = [];

  @Output() cadastroSucessoEnviado: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public pokemonService: PokemonService,
    public pokemonTiposService: PokemonTipoService,
  ) {
  }

  ngOnInit(): void {
    this.getPokemonsTipos();
    this.initForm();
  }

  onSubmit() {
    if (this.form.valid) {
      const pokemon: AddPokemonInputModel = {
        nome: this.form.controls['nome'].value,
        descricao: this.form.controls['descricao'].value,
        pokemonTipoId: this.form.controls['pokemontipo'].value,
        imagemUrl: this.form.controls['imagem'].value
      };

      this.pokemonService.add(pokemon).subscribe({
        next: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Pokemón cadastrado com sucesso!',
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
              this.form.reset();
              this.form.controls['pokemontipo'].setValue('');
              this.cadastroSucessoEnviado.emit(true);
              this.activeModal.close('Submit click');
            }
          });
        },

        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
    } else {
      this.verificateValidationErros(this.form);
    }
  }

  private verificateValidationErros(formGroup: FormGroup) {
    Object.keys(this.form.controls).forEach((campo) => {
      const controle = this.form.get(campo);
      if (controle instanceof FormGroup) {
        controle?.markAsDirty();
        this.verificateValidationErros(controle)
      } else {
        controle?.markAsDirty();
      }
    });
  }

  private getPokemonsTipos() {
    this.pokemonTiposService.getAll().subscribe({
      next: value => {
        this.pokemonTipos = value;
      },
      error: err => {
        console.log(err)
      }
    });
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

  private initForm() {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      pokemontipo: ['', [Validators.required]],
      descricao: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      imagem: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]]
    })
  }
}
