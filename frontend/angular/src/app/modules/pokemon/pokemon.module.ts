import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { PokemonComponent } from './pokemon.component';
import { NavComponent } from '../../shared/components/nav/nav.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { PokemonService } from '../../shared/services';

@NgModule({
  declarations: [
    PokemonComponent,
    NavComponent,
    HeaderComponent,
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
