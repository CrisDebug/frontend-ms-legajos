import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LegajosPageComponent } from './features/legajos/pages/legajos-page/legajos-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // Ruta principal
      { path: 'legajos', component: LegajosPageComponent },

      // Redirección por defecto
      { path: '', redirectTo: 'legajos', pathMatch: 'full' }
    ]
  }
];