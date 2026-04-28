import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Legajo } from '../models/legajo.model';

/**
 * Servicio mock de Legajos.
 * Luego se reemplaza por HttpClient real.
 */
@Injectable({
  providedIn: 'root'
})
export class LegajosService {

  // 🧪 Mock: simula registros provenientes de API
  private legajos: Legajo[] = [
    { id: 1, manualId: 1001, descripcionLegajo: 'legajo microdocs 3', casilleroId: 1 ,fechaInicioLegajo:'26-04-2026'},
    { id: 2, manualId: 1002, descripcionLegajo: 'Legajo microdocs 3', casilleroId: 1 ,fechaInicioLegajo:'01-01-2026'},
    { id: 3, manualId: 2001, descripcionLegajo: 'Legajo microdocs 3', casilleroId: 2 ,fechaInicioLegajo:'01-25-2026'},
    { id: 4, manualId: 3001, descripcionLegajo: 'Legajo microdocs 4', casilleroId: 3 ,fechaInicioLegajo:'02-26-2026'}
  ];

  // // 📌 Obtener legajos por casillero
  // getByCasillero(casilleroId: number): Observable<Legajo[]> {
  //   return of(this.legajos.filter(l => l.casilleroId === casilleroId));
  // }
  
  //busqueda de id maual de legajo
  searchByManualId(casilleroId: number, manualId: number): Observable<Legajo | null> {
  const result = this.legajos.find(
    l => l.casilleroId === casilleroId && l.manualId === manualId
  );

  return of(result ?? null);
}

  // 📌 Crear legajo en un casillero
  createLegajo(newLegajo: Omit<Legajo, 'id'>): Observable<Legajo> {
    const id = this.legajos.length + 1;

    const legajo: Legajo = {
      id,
      ...newLegajo
    };

    this.legajos.push(legajo);

    return of(legajo);
  }
}