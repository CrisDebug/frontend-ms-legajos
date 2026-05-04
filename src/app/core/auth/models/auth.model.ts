export interface User {
  idUsuario: number;
  nombreUsuario: string;
  email: string;
  rol: string;
}

export interface LoginResponse {
  idUsuario: number;
  nombreUsuario: string;
  email: string;
  rol: string;
  token: string;
  mensaje?: string;
}

export interface JwtPayload {
  sub: string;        // email
  idUsuario: number;
  rol: string;
  exp: number;
}