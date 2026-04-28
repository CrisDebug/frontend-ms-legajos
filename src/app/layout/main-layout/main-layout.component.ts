import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { CasilleroContextService } from '../../core/services/casillero-context.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidebarComponent,TopbarComponent, AsyncPipe, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  
  // observable del casillero seleccionado
  casilleroId$: Observable<number | null>;

  constructor(private context: CasilleroContextService) {
    this.casilleroId$ = this.context.casilleroId$;
  }

}
