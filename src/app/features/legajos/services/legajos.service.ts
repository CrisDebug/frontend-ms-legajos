import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Legajo } from '../models/legajo.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LegajosService {

  // 📌 URL base del microservicio de legajos
  // Ej: http://localhost:8083/api/legajos
  private readonly baseUrl = `${environment.API_LEGAJOS}/api/legajos`;

  constructor(private http: HttpClient) {}

  /**
   * ✅ GET: listar todos los legajos (API real)
   */
  getAll(): Observable<Legajo[]> {
    return this.http.get<Legajo[]>(this.baseUrl);
  }

  /**
   * ✅ GET: obtener un legajo por ID (API real)
   */
  getById(id: number): Observable<Legajo> {
    return this.http.get<Legajo>(`${this.baseUrl}/${id}`);
  }

  /**
   * ✅ POST: crear un legajo (API real)
   */
  createLegajo(newLegajo: Omit<Legajo, 'id'>): Observable<Legajo> {
    return this.http.post<Legajo>(this.baseUrl, newLegajo);
  }

  /**
   * ✅ PUT: actualizar un legajo por ID (API real)
   */
  updateLegajo(id: number, legajo: Omit<Legajo, 'id'>): Observable<Legajo> {
    return this.http.put<Legajo>(`${this.baseUrl}/${id}`, legajo);
  }

  /**
   * ✅ DELETE: eliminar un legajo por ID (API real)
   */
  deleteLegajo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  /**
   * 🔎 Buscar por manualId dentro de un casillero
   * ⚠️ El backend NO tiene endpoint directo para esto.
   * Entonces traemos todos los legajos y filtramos en frontend.
   */
  searchByManualId(casilleroId: number, manualId: number): Observable<Legajo | null> {
    return this.getAll().pipe(
      map(lista =>
        lista.find(l => l.casilleroId === casilleroId && l.manualId === manualId) ?? null
      )
    );
  }
}