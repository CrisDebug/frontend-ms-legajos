import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsuarioService } from '../../usuarios/services/usuario.service';
import { UsuarioResponseDTO } from '../../usuarios/models/usuario.model';

@Component({
  selector: 'app-admin-usuarios-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-usuarios-page.component.html'
})
export class AdminUsuariosPageComponent implements OnInit {

  // lista de usuarios
  usuarios: UsuarioResponseDTO[] = [];

  // usuario en edición
  usuarioEditandoId: number | null = null;

  usuarioEditando = {
    nombreUsuario: ''
  };

  // estado carga
  loading = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  // cargar usuarios
  cargarUsuarios(): void {
    this.loading = true;

    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando usuarios', err);
        this.loading = false;
      }
    });
  }

  // iniciar edición
  iniciarEdicion(usuario: UsuarioResponseDTO): void {
    this.usuarioEditandoId = usuario.idUsuario;

    this.usuarioEditando = {
      nombreUsuario: usuario.nombreUsuario
    };
  }

  // cancelar edición
  cancelarEdicion(): void {
    this.usuarioEditandoId = null;

    this.usuarioEditando = {
      nombreUsuario: ''
    };
  }

  guardarEdicion(id: number): void {

  // Buscar el usuario en la lista local
  const usuario = this.usuarios.find(u => u.idUsuario === id);

  if (!usuario) return;

  // Actualizar solo el campo editable en memoria
  usuario.nombreUsuario = this.usuarioEditando.nombreUsuario;

  // Cerrar estado de edición
  this.cancelarEdicion();

  // Log de control para desarrollo
  console.log('Usuario actualizado:', usuario);
}

  // eliminar usuario
  eliminarUsuario(id: number): void {

    const ok = confirm('¿Seguro que quieres eliminar este usuario?');

    if (!ok) return;

    this.usuarioService.deleteUsuario(id).subscribe({
      next: () => {
        this.cargarUsuarios();
      },
      error: (err) => {
        console.error('Error eliminando usuario', err);
      }
    });

  }

}