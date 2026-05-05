import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasilleroContextService } from '../../../../core/services/casillero-context.service';
import { CasillerosService } from '../../../../features/casilleros/services/CasilleroService';
import { Casillero } from '../../../../features/casilleros/models/Casillero';

/**
 * Sidebar principal de casilleros
 * - Consume backend real (Spring Boot)
 * - Maneja selección global con BehaviorSubject
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // 📦 lista de casilleros desde backend
  casilleros: Casillero[] = [];

  // 🎯 casillero seleccionado actualmente
  selectedCasilleroId: number | null = null;

  constructor(
    private context: CasilleroContextService,
    private casillerosService: CasillerosService
  ) {}

  /**
   * 🚀 Inicialización del componente
   */
  ngOnInit(): void {
    this.loadCasilleros();

    // 🔄 sincroniza selección global con UI
    this.context.casilleroId$.subscribe(id => {
      this.selectedCasilleroId = id;
    });
  }

  /**
   * 📡 Obtener casilleros desde backend
   */
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

  /**
   * 🎯 Seleccionar casillero activo
   */
  selectCasillero(id: number): void {
    this.selectedCasilleroId = id;
    this.context.setCasillero(id);
  }

  /**
   * 🔄 Limpiar selección
   */
  clearSelection(): void {
    this.selectedCasilleroId = null;
    this.context.resetCasillero();
  }
}