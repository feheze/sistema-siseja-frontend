import { Routes } from '@angular/router';

export const routesAll: Routes = [
  {
    path: 'polos',
    loadChildren: () => import('./pages/polos/polos.routes').then(m => m.polosRoutes)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./pages/cursos/cursos.routes').then(m => m.cursosRoutes)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.dashboardRoutes)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  // Adicione outras rotas/lazy features aqui
];