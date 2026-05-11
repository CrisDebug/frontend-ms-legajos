import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

import { LoginResponse } from '../models/auth.model';
import { RegisterRequest, RegisterResponse } from '../models/register.model';
import { JwtPayload } from '../models/auth.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL base del microservicio de usuarios/auth
  private apiUrl = `${environment.API_USUARIOS}/api/auth`;

  // Estado reactivo del usuario autenticado
  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadSession();
  }

  // ==========================
  // LOGIN
  // ==========================
  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        this.setSession(response);
      })
    );
  }

  // ==========================
  // REGISTER
  // ==========================
  register(data: RegisterRequest) {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, data);
  }

  // ==========================
  // GUARDAR SESIÓN
  // ==========================
  private setSession(user: LoginResponse) {
    // Guarda usuario completo
    localStorage.setItem('auth_user', JSON.stringify(user));

    // Guarda token JWT
    localStorage.setItem('token', user.token);

    // Actualiza estado reactivo
    this.currentUserSubject.next(user);
  }

  // ==========================
  // CARGAR SESIÓN AL RECARGAR
  // ==========================
  private loadSession() {
  const data = localStorage.getItem('auth_user');

  if (data) {
    this.currentUserSubject.next(JSON.parse(data));
  } else {
    // 🔥 sincronizar desde token si no existe auth_user
    const tokenData = this.getUserFromToken();

    if (tokenData) {
      this.currentUserSubject.next({
        ...tokenData,
        token: this.getToken()!
      } as any);
    }
  }
}

  // ==========================
  // TOKEN
  // ==========================
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ==========================
  // LOGOUT
  // ==========================
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('auth_user');
    this.currentUserSubject.next(null);
  }

  // ==========================
  // ESTADO DE LOGIN
  // ==========================
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ==========================
  // OBTENER ROL (CORREGIDO)
  // ==========================
  getRole(): string | null {
    const user = this.currentUserSubject.value;

    // 1. intenta desde estado actual
    if (user?.rol) {
      return user.rol.toUpperCase();
    }

    // 2. fallback desde JWT
    const tokenUser = this.getUserFromToken();
    return tokenUser?.rol?.toUpperCase() || null;
  }

  // ==========================
  // OBTENER USUARIO ACTUAL
  // ==========================
  getUser(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  // ==========================
  // DECODIFICAR JWT
  // ==========================
  getUserFromToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));

    return {
      sub: payload.sub,
      idUsuario: payload.id,
      rol: payload.rol,
      exp: payload.exp
    };
  }
}