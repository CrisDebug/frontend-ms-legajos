import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasilleroContextService } from '../../../../core/services/casillero-context.service';

// Modelo del casillero (estructura real futura del backend)
interface Casillero {
  id: number;
  nombreCasillero: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  //constructor
  constructor(private context: CasilleroContextService) {}


  // 🧪 MOCK (simula backend por ahora)
  casilleros: Casillero[] = [
    { id: 1, nombreCasillero: 'Casillero A' },
    { id: 2, nombreCasillero: 'Casillero B' },
    { id: 3, nombreCasillero: 'Casillero C' }
  ];

  // 🎯 estado del casillero seleccionado (contexto global futuro)
  selectedCasilleroId: number | null = null;

  // 📌 seleccionar casillero
  selectCasillero(id: number) {
  this.selectedCasilleroId = id;
  this.context.setCasillero(id);
  }
}