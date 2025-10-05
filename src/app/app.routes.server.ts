import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'polos',
    renderMode: RenderMode.Client // Mude para Client para SPA
  },
  {
    path: 'polos/new',
    renderMode: RenderMode.Client // Mude para Client para SPA
  },
  {
    path: 'polos/:id',
    renderMode: RenderMode.Client // Mude para Client para SPA
  },
  {
    path: '**',
    renderMode: RenderMode.Client // Mude para Client para SPA
  }
];