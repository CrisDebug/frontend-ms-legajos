export interface RegisterRequest {
  nombreUsuario: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  idUsuario: number;
  nombreUsuario: string;
  email: string;
  rol: string;
  mensaje: string;
}