import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'polos/:id', // Rota para detalhes do polo
    renderMode: RenderMode.Server // Renderiza no servidor
  },
];
