import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { LoginResponse } from '../models/auth.model';
import { RegisterRequest , RegisterResponse} from '../models/register.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8084/api/auth';

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
  // SESIÓN
  // ==========================
  private setSession(user: LoginResponse) {
    localStorage.setItem('auth_user', JSON.stringify(user));
    localStorage.setItem('token', user.token);
    this.currentUserSubject.next(user);
  }

  private loadSession() {
    const data = localStorage.getItem('auth_user');

    if (data) {
      this.currentUserSubject.next(JSON.parse(data));
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
  logout() {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  // ==========================
  // HELPERS
  // ==========================
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    const user = this.currentUserSubject.value;
    return user?.rol || null;
  }

  getUser(): LoginResponse | null {
    return this.currentUserSubject.value;
  }
}