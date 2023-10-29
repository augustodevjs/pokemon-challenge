import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { BaseService } from "../configs/base-service";
import { PokemonTipoViewModel } from "../../domain-types";
import { HttpStatusCode } from "../configs/http";
import { UnexpectedError } from "../../core";

@Injectable({
  providedIn: 'root'
})
export class PokemonTipoService extends BaseService {
  getAll(): Observable<PokemonTipoViewModel[]> {
    const url = `${this.apiUrl}/pokemon-tipo`;
    return this.httpClient.get<PokemonTipoViewModel[]>(url);
  }

  errorHandlingGetAll(response: HttpErrorResponse): string[] {
    switch (response.status) {
      case HttpStatusCode.BadRequest:
        return response.error.erros;
      default:
        throw new UnexpectedError();
    }
  }
}
