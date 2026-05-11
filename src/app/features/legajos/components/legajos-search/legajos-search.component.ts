import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-legajos-search', // 👈 ARREGLADO
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './legajos-search.component.html'
})
export class LegajosSearchComponent {

  @Input() casilleroId: number | null = null;
  @Input() resetTrigger!: number;

  @Output() onSearch = new EventEmitter<number>();

  manualId: number | null = null;

  @ViewChild('manualInput')
  manualInput!: ElementRef<HTMLInputElement>;

  focusInput() {
    this.manualInput?.nativeElement.focus();
  }

  /**
   * 🔄 Se ejecuta cuando cambia cualquier @Input
   */
  ngOnChanges(changes: SimpleChanges) {

    // 📌 si cambia el casillero → reset input
    if (changes['resetTrigger']) {
      this.reset();
    }
  }

  buscar() {
    if (!this.manualId) return;
    this.onSearch.emit(this.manualId);
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.buscar();
    }
  }

  /**
   * 🔁 Limpia el input
   */
  reset() {
    this.manualId = null;
  }
}