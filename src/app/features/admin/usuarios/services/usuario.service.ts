import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioResponseDTO, UsuarioRequestDTO } from '../models/usuario.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${environment.API_USUARIOS}/api/usuarios`;

  constructor(private http: HttpClient) {}

  // 📦 LISTAR
  getUsuarios(): Observable<UsuarioResponseDTO[]> {
    return this.http.get<UsuarioResponseDTO[]>(this.apiUrl);
  }

  // ➕ CREAR
  createUsuario(data: UsuarioRequestDTO): Observable<UsuarioResponseDTO> {
    return this.http.post<UsuarioResponseDTO>(this.apiUrl, data);
  }

  // ✏️ ACTUALIZAR
  updateUsuario(id: number, data: UsuarioRequestDTO): Observable<UsuarioResponseDTO> {
    return this.http.put<UsuarioResponseDTO>(`${this.apiUrl}/${id}`, data);
  }

  // 🗑 ELIMINAR
  deleteUsuario(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }

  // 🔎 OBTENER POR ID (opcional pero útil)
  getUsuarioById(id: number): Observable<UsuarioResponseDTO> {
    return this.http.get<UsuarioResponseDTO>(`${this.apiUrl}/${id}`);
  }
}