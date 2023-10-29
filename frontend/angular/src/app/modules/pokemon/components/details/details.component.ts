import { NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PokemonTipoViewModel, PokemonViewModel, UpdatePokemonInputModel } from 'src/app/shared/domain-types';
import { PokemonService, PokemonTipoService } from 'src/app/shared/services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  form!: FormGroup;
  pokemon!: PokemonViewModel;
  pokemonTipo!: PokemonTipoViewModel[];
  @Input() pokemonId!: number;
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
    this.initForm();
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
        next: value => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Pokemón atualizado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          });

          this.updateSucessoEnviado.emit(true);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
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

  protected getPokemonTipos() {
    this.pokemonTipoService.getAll().subscribe({
      next: value => {
        this.pokemonTipo = value;
      },
      error: err => {
        console.log(err)
      }
    });
  }

  private initForm() {
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
      error: err => {
        console.log(err)
      }
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
    } else {
      console.log('Pokemon não encontrado');
    }
  }
}
