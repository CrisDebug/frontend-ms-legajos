import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  // 👤 usuario logueado (email + rol)
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    // 🔐 obtenemos usuario desde el JWT al cargar componente
    this.user = this.authService.getUserFromToken();
  }

  /**
   * 🚪 LOGOUT
   * - elimina token
   * - limpia sesión
   * - redirige a login
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}