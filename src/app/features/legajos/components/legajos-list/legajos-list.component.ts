import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Legajo } from '../../models/legajo.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-legajos-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './legajos-list.component.html'
})
export class LegajosListComponent {
  @Input() result: Legajo[] | null = [];
}