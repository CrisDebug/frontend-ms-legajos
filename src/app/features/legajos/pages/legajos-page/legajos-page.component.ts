import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { CasilleroContextService } from '../../../../core/services/casillero-context.service';
import { LegajosService } from '../../services/legajos.service';

import { LegajosSearchComponent } from '../../components/legajos-search/legajos-search.component';
import { LegajoStateComponent, LegajoViewState } from '../../components/legajo-state/legajo-state.component';

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
export class LegajosPageComponent implements OnInit {

  // permite acceder al componente buscador (para reset y focus)
  @ViewChild(LegajosSearchComponent)
  searchComponent!: LegajosSearchComponent;

  // casillero activo (contexto global)
  casilleroId$: Observable<number | null>;

  // estado general del flujo UI
  state: LegajoViewState = { mode: 'idle' };

  // mensaje visual para feedback al usuario
  mensaje: string | null = null;

  constructor(
    private context: CasilleroContextService,
    private legajosService: LegajosService
  ) {
    this.casilleroId$ = this.context.casilleroId$;
  }

  // cuando cambia el casillero, reseteamos el flujo
  ngOnInit() {
    this.casilleroId$.subscribe(() => {
      this.state = { mode: 'idle' };
      this.mensaje = null;
    });
  }

  /**
   * buscar legajo dentro del casillero activo
   */
  buscar(manualId: number) {

    const casilleroId = this.context.getCasillero();

    if (!casilleroId) return;

    // limpiar mensaje anterior al iniciar búsqueda
    this.mensaje = null;

    // estado loading para UX
    this.state = { mode: 'loading' };

    this.legajosService.searchByManualId(casilleroId, manualId)
      .subscribe({
        next: (res) => {

          // si existe → found
          if (res) {
            this.state = {
              mode: 'found',
              legajo: res
            };
          }
          // si no existe → not-found
          else {
            this.state = {
              mode: 'not-found',
              manualId
            };
          }

        },
        error: (err) => {
          console.error('Error buscando legajo', err);

          // si falla la búsqueda, igual dejamos el flujo en not-found
          this.state = {
            mode: 'not-found',
            manualId
          };
        }
      });
  }

  /**
   * iniciar creación desde el botón "crear legajo"
   */
  startCreate(manualId: number) {

    // limpiar mensaje anterior
    this.mensaje = null;

    // reset del input buscador
    this.searchComponent?.reset();

    // pasar a estado creando (manualId sugerido pero editable)
    this.state = {
      mode: 'creating',
      manualId
    };
  }

  /**
   * guardar legajo en backend
   * ahora recibe manualId y descripcion desde el formulario
   */
  saveLegajo(data: { manualId: number; descripcion: string }) {

    const casilleroId = this.context.getCasillero();

    if (!casilleroId) return;

    // limpiar mensaje anterior
    this.mensaje = null;

    // request body según backend
    const newLegajo = {
      manualId: data.manualId,
      descripcionLegajo: data.descripcion,
      casilleroId
    };

    this.legajosService.createLegajo(newLegajo)
      .subscribe({
        next: (created) => {

          // mensaje de confirmación
          this.mensaje = 'Legajo creado correctamente';

          // cambiar a estado found con el legajo recién creado
          this.state = {
            mode: 'found',
            legajo: created
          };
        },
        error: (err) => {
          console.error('Error creando legajo', err);

          // mensaje de error visual
          this.mensaje = 'Error al crear el legajo';
        }
      });
  }

  /**
   * cancelar creación
   */
  cancelCreate() {

    // limpiar mensaje
    this.mensaje = null;

    // volver al estado inicial
    this.state = { mode: 'idle' };

    // reset buscador
    this.searchComponent?.reset();
    this.searchComponent?.focusInput();
  }
}