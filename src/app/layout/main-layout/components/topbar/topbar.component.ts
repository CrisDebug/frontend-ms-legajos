import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { map } from 'rxjs';
import { LoginResponse } from '../../../../core/auth/models/auth.model';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  user$;
  role$;

  // 👇 ESTO ES LO QUE FALTABA
  @Output() toggleAdmin = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user$ = this.authService.currentUser$;

    this.role$ = this.authService.currentUser$.pipe(
      map((user: LoginResponse | null) => user?.rol ?? null)
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToAdmin(): void {
    this.router.navigate(['/admin/usuarios']);
  }
}