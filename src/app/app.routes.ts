import { Routes } from '@angular/router';

export const routesAll: Routes = [
  {
    path: 'polos',
    loadChildren: () => import('./pages/polos/polos.routes').then(m => m.polosRoutes)
  },
  {
    path: '',
    redirectTo: 'polos',
    pathMatch: 'full'
  }
  // Adicione outras rotas/lazy features aqui
];