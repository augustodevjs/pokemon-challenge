import { Observable } from "rxjs";
import { Injectable } from '@angular/core';

import { BaseService } from "../configs/base-service";
import { PokemonTipoViewModel } from "../../domain-types";

@Injectable({
  providedIn: 'root'
})
export class PokemonTipoService extends BaseService {
  getAll(): Observable<PokemonTipoViewModel[]> {
    const url = `${this.apiUrl}/pokemon-tipo`;
    return this.httpClient.get<PokemonTipoViewModel[]>(url);
  }
}
