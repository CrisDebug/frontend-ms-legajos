import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  form: FormGroup;
  error: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // 🔐 AUTO LOGIN
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/legajos']);
    }
  }

  login() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    const { email, password } = this.form.value;

    this.authService.login(email!, password!).subscribe({
      next: (res: any) => {

        // 💾 guardar token
        localStorage.setItem('token', res.token);

        this.loading = false;
        this.router.navigate(['/legajos']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Credenciales inválidas';
      }
    });
  }
}