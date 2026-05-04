import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { LoginComponent } from './features/auth/pages/login.component';
import { LegajosPageComponent } from './features/legajos/pages/legajos-page/legajos-page.component';

export const routes: Routes = [

  // 🔐 LOGIN FUERA DEL LAYOUT
  {
    path: 'login',
    component: LoginComponent
  },

  // 🧱 APP PROTEGIDA (LAYOUT)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [

      { path: 'legajos', component: LegajosPageComponent },

      { path: '', redirectTo: 'legajos', pathMatch: 'full' }
    ]
  },

  // fallback
  { path: '**', redirectTo: 'login' }
];