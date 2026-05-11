import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasilleroContextService } from '../../../../core/services/casillero-context.service';
import { CasillerosService } from '../../../../features/casilleros/services/CasilleroService';
import { Casillero } from '../../../../features/casilleros/models/Casillero';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  casilleros: Casillero[] = [];

  // 🎯 ahora sí fuente única de verdad
  selectedCasilleroId$: Observable<number | null>;

  constructor(
    private context: CasilleroContextService,
    private casillerosService: CasillerosService
  ) {
    this.selectedCasilleroId$ = this.context.casilleroId$;
  }

  ngOnInit(): void {
    this.loadCasilleros();
  }

  loadCasilleros(): void {
    this.casillerosService.getCasilleros()
      .subscribe({
        next: (data: Casillero[]) => {
          this.casilleros = data;
        },
        error: (err: unknown) => {
          console.error('Error cargando casilleros:', err);
        }
      });
  }

  selectCasillero(id: number): void {
    this.context.setCasillero(id);
  }

  clearSelection(): void {
    this.context.resetCasillero();
  }
}