import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Casillero } from '../models/Casillero';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CasillerosService {

  // Base dinámica desde environment (evita hardcodear URLs)
  // private readonly baseUrl = `${environment.apiUrl}/api/casilleros`;
  private readonly baseUrl = `${environment.API_CASILLEROS}/api/casilleros`;

  constructor(private http: HttpClient) {}

  // GET: obtener todos los casilleros
  getCasilleros(): Observable<Casillero[]> {
    return this.http.get<Casillero[]>(this.baseUrl);
  }
}