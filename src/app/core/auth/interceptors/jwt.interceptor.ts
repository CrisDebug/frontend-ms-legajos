import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * 🔐 Interceptor JWT
 * Agrega automáticamente el token a todas las requests HTTP
 */
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  // 🧠 Inyectamos AuthService
  const authService = inject(AuthService);

  // 🔑 Obtenemos token del storage
  const token = authService.getToken();

  // 🚨 IMPORTANTE: evitar duplicar headers si ya existe
  if (token) {

    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(clonedRequest);
  }

  // 👉 si no hay token, dejamos la request normal
  return next(req);
};