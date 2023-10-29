import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";

import { HttpStatusCode } from "../configs";
import { BaseService } from "../configs/base-service";
import { NotFoundError, UnexpectedError, ValidationError } from "../../core";
import { AddPokemonInputModel, AddPokemonViewModel, PokemonViewModel, UpdatePokemonInputModel, UpdatePokemonViewModel } from "../../domain-types";

@Injectable({
  providedIn: 'root'
})
export class PokemonService extends BaseService {
  getAll(): Observable<PokemonViewModel[]> {
    const url = `${this.apiUrl}/pokemon`;
    return this.httpClient.get<PokemonViewModel[]>(url);
  }

  getAllByPokemonType(id: number): Observable<PokemonViewModel[]> {
    const url = `${this.apiUrl}/pokemon/pokemon-tipo/${id}`;
    return this.httpClient.get<PokemonViewModel[]>(url);
  }

  add(data: AddPokemonInputModel): Observable<AddPokemonViewModel> {
    const url = `${this.apiUrl}/pokemon`;
    return this.httpClient.post<AddPokemonViewModel>(url, data);
  }

  loadById(id: number): Observable<PokemonViewModel> {
    const url = `${this.apiUrl}/pokemon/${id}`;
    return this.httpClient.get<PokemonViewModel>(url);
  }

  update(id: number, data: UpdatePokemonInputModel): Observable<UpdatePokemonViewModel> {
    const url = `${this.apiUrl}/pokemon/${id}`;
    return this.httpClient.put<UpdatePokemonViewModel>(url, data);
  }

  remove(id: number): Observable<void> {
    const url = `${this.apiUrl}/pokemon/${id}`;
    return this.httpClient.delete<void>(url);
  }

  errorHandlingAdd(response: HttpErrorResponse): string[] {
    switch (response.status) {
      case HttpStatusCode.BadRequest:
        throw new ValidationError(response.error);
      default:
        throw new UnexpectedError();
    }
  }

  errorHandlingUpdate(response: HttpErrorResponse): string[] {
    switch (response.status) {
      case HttpStatusCode.BadRequest:
        throw new ValidationError(response.error);
      case HttpStatusCode.NotFound:
        throw new NotFoundError();
      default:
        throw new UnexpectedError();
    }
  }
}
