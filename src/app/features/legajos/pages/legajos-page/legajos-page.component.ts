import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { CasilleroContextService } from '../../../../core/services/casillero-context.service';
import { LegajosService } from '../../services/legajos.service';

import { LegajosSearchComponent } from '../../components/legajos-search/legajos-search.component';
import { LegajoStateComponent, LegajoViewState } from '../../components/legajo-state/legajo-state.component';

import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-legajos-page',
  standalone: true,
  imports: [
    CommonModule,
    LegajosSearchComponent,
    LegajoStateComponent
  ],
  templateUrl: './legajos-page.component.html'
})
export class LegajosPageComponent {

  //view child
  @ViewChild(LegajosSearchComponent)
  searchComponent!: LegajosSearchComponent;
  
  // 📌 Casillero activo (contexto global del sistema)
  casilleroId$: Observable<number | null>;

  // 📌 ÚNICA fuente de verdad de la UI (estado del flujo)
  state: LegajoViewState = { mode: 'idle' };

  

  constructor(
    private context: CasilleroContextService,
    private legajosService: LegajosService
  ) {
    this.casilleroId$ = this.context.casilleroId$;
  }

  /**
   * 🔎 BÚSQUEDA DE LEGAJO
   * - Siempre dentro del casillero activo
   * - No retorna listas, solo 1 resultado o null
   */
  buscar(manualId: number) {
    const casilleroId = this.context.getCasillero();

    if (!casilleroId) return;

    // 📌 estado loading para UX
    this.state = { mode: 'loading' };

    this.legajosService.searchByManualId(casilleroId, manualId)
      .subscribe(res => {

        // ✔ si existe legajo → estado FOUND
        if (res) {
          this.state = {
            mode: 'found',
            legajo: res
          };
        } 
        // ❌ si no existe → estado NOT FOUND
        else {
          this.state = {
            mode: 'not-found',
            manualId
          };
        }
      });
  }

  /**
   * ➕ INICIAR CREACIÓN
   * - Se dispara desde UI cuando el usuario decide crear
   */
  startCreate(manualId: number) {

  // ✅ reset input del buscador
  this.searchComponent?.reset();

  this.state = {
    mode: 'creating',
    manualId
  };
}

  /**
   * 💾 GUARDAR LEGAJO
   * - Se usa tanto en creación como en edición futura
   */
  saveLegajo(descripcion: string) {
    const casilleroId = this.context.getCasillero();

    if (!casilleroId || this.state.mode !== 'creating') return;

    const newLegajo = {
      manualId: this.state.manualId,
      descripcionLegajo: descripcion,
      casilleroId
    };

    this.legajosService.createLegajo(newLegajo)
      .subscribe(created => {
        // ✔ después de crear → estado FOUND
        this.state = {
          mode: 'found',
          legajo: created
        };
      });
  }

  /**
   * 🔁 RESET cuando cambia el casillero
   * - limpia estado de búsqueda
   */
  ngOnInit() {
    this.casilleroId$.subscribe(() => {
      this.state = { mode: 'idle' };
    });
  }
  cancelCreate() {
  this.state = { mode: 'idle' };

  this.searchComponent?.reset();
  this.searchComponent?.focusInput();
}
}