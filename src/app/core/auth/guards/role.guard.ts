import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const RoleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // 👤 usuario actual (desde token)
  const user = authService.getUserFromToken();

  // 🚫 si no hay usuario → fuera
  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  // 🎯 roles permitidos desde la ruta
  const allowedRoles = route.data['roles'] as string[];

  // ❌ si no hay configuración de roles → denegar por seguridad
  if (!allowedRoles || allowedRoles.length === 0) {
    return false;
  }

  // 🔐 validación de rol
  const hasRole = allowedRoles.includes(user?.rol ?? '');

  if (!hasRole) {
    router.navigate(['/legajos']); // fallback USER
    return false;
  }

  return true;
};