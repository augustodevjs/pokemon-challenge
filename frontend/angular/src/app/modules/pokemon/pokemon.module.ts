import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { PokemonComponent } from './pokemon.component';
import { PokemonService } from '../../shared/services';
@NgModule({
  declarations: [
    PokemonComponent,
  ],
  exports: [
    PokemonComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgOptimizedImage,
  ],
  providers: [PokemonService]
})
export class PokemonModule { }
