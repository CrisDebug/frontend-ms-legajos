import { Routes } from '@angular/router';

// 🧱 Layout principal
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

// 🔐 Guards
import { AuthGuard } from './core/auth/guards/auth.guard';
import { RoleGuard } from './core/auth/guards/role.guard';

// 🔑 Auth pages
import { LoginComponent } from './features/auth/pages/login.component';
import { RegisterComponent } from './features/auth/pages/register.component';
import { RecoverPasswordComponent } from './features/auth/pages/recover-password/recover-password.component';

// 📄 Sistema
import { LegajosPageComponent } from './features/legajos/pages/legajos-page/legajos-page.component';

// 👑 Admin
import { AdminUsuariosPageComponent } from './features/admin/pages/admin-usuarios-page/admin-usuarios-page.component';

export const routes: Routes = [

  // =========================
  // 🔓 PÚBLICAS
  // =========================
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'recover-password', // ✅ NUEVA RUTA
    component: RecoverPasswordComponent
  },

  // =========================
  // 🧱 PROTEGIDO
  // =========================
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [

      // 👤 USER DEFAULT
      {
        path: 'legajos',
        component: LegajosPageComponent
      },

      // 👑 ADMIN ONLY
      {
        path: 'admin/usuarios',
        component: AdminUsuariosPageComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },

      // 🔁 default dentro del layout
      {
        path: '',
        redirectTo: 'legajos',
        pathMatch: 'full'
      }
    ]
  },

  // =========================
  // 🚫 FALLBACK
  // =========================
  {
    path: '**',
    redirectTo: 'login'
  }
];