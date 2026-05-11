export interface UsuarioResponseDTO {
  idUsuario: number;
  nombreUsuario: string;
  email: string;
  estado: string;
  fechaCreacion: string;
  rol: string;
}
export interface UsuarioRequestDTO {
  nombreUsuario: string;
  email: string;
  estado: string;
  rol: string;
}