import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioResponseDTO } from '../../models/usuario.model';

@Component({
  selector: 'app-admin-usuarios-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-usuarios-page.component.html'
})
export class AdminUsuariosPageComponent implements OnInit {

  usuarios: UsuarioResponseDTO[] = [];
  loading = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
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
  
}