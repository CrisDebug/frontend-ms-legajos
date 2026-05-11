import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type LegajoViewState =
  | { mode: 'idle' }
  | { mode: 'loading' }
  | { mode: 'found'; legajo: any }
  | { mode: 'not-found'; manualId: number }
  | { mode: 'creating'; manualId: number };

@Component({
  selector: 'app-legajo-state',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './legajo-state.component.html'
})
export class LegajoStateComponent implements OnChanges {

  @Input() state!: LegajoViewState;

  @Output() create = new EventEmitter<number>();

  @Output() save = new EventEmitter<{ manualId: number; descripcion: string }>();

  @Output() cancel = new EventEmitter<void>();

  // 🧠 FORM LOCAL (sin null para evitar errores Angular strict)
  manualId: number = 0;
  descripcion: string = '';

  ngOnChanges(changes: SimpleChanges): void {

    // cuando entramos a crear → inicializamos formulario
    if (this.state?.mode === 'creating') {

      this.manualId = this.state.manualId ?? 0;
      this.descripcion = '';
    }
  }

  // 💾 guardar legajo
  onSave(): void {

    if (this.manualId <= 0) return;

    this.save.emit({
      manualId: this.manualId,
      descripcion: this.descripcion
    });
  }

  // ❌ cancelar
  onCancel(): void {
    this.cancel.emit();
  }

  // ➕ crear desde not-found
  onCreate(): void {
    if (this.state.mode === 'not-found') {
      this.create.emit(this.state.manualId);
    }
  }
}