import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Servicio de contexto global:
 * maneja el casillero seleccionado en toda la app
 */
@Injectable({
  providedIn: 'root'
})
export class CasilleroContextService {

  // Estado reactivo del casillero seleccionado
  private casilleroIdSubject = new BehaviorSubject<number | null>(null);

  // Observable para suscribirse a cambios
  casilleroId$ = this.casilleroIdSubject.asObservable();

  // Setear casillero activo
  setCasillero(id: number) {
    this.casilleroIdSubject.next(id);
  }

  // Obtener valor actual
  getCasillero() {
    return this.casilleroIdSubject.value;
  }
  resetCasillero() {
  this.casilleroIdSubject.next(null);
  }
}