import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Legajo } from '../../models/legajo.model';
import { FormsModule } from '@angular/forms';

export type LegajoViewState =
  | { mode: 'idle' }
  | { mode: 'loading' }
  | { mode: 'found'; legajo: Legajo }
  | { mode: 'not-found'; manualId: number }
  | { mode: 'creating'; manualId: number };

@Component({
  selector: 'app-legajo-state',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './legajo-state.component.html'
})
export class LegajoStateComponent {

  @Input() state!: LegajoViewState;

  @Output() create = new EventEmitter<number>();
  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();
}