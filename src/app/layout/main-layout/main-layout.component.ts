import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { CasilleroContextService } from '../../core/services/casillero-context.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdminUsuariosPageComponent } from '../../features/admin/pages/admin-usuarios-page/admin-usuarios-page.component';

// 👉 IMPORTANTE: ajusta esta ruta a la real en tu proyecto
import { LegajosSearchComponent } from '../../features/legajos/components/legajos-search/legajos-search.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    TopbarComponent,
    AsyncPipe,
    NgIf,
    RouterOutlet,
    AdminUsuariosPageComponent,
    LegajosSearchComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {

  // 📦 casillero activo
  casilleroId$: Observable<number | null>;

  // 🧩 control del panel admin
  showAdminPanel = false;

  constructor(
    private context: CasilleroContextService,
    private authService: AuthService
  ) {
    this.casilleroId$ = this.context.casilleroId$;
  }

  // 🔘 toggle panel admin
  toggleAdminPanel(): void {
    this.showAdminPanel = !this.showAdminPanel;
  }
}