import { Routes } from '@angular/router';
import { polosRoutes } from './pages/polos/polos.routes';

const routes: Routes = [
  ...polosRoutes,
  // other routes
];

export const routesAll: Routes = [
  // 2. Desestrutura e combina as rotas de feature
  ...polosRoutes,
  

  // Redirecionamento (opcional, pode ser ajustado dependendo da sua página inicial)
  {
    path: '',
    redirectTo: 'polos',
    pathMatch: 'full'
  }

  // Rota curinga para 404
  //{ path: '**', redirectTo: 'cadastros/aluno' } 
];