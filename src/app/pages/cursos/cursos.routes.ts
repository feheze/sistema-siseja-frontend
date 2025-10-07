import { Routes } from '@angular/router';

export const cursosRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./curso-list/curso-list').then(m => m.CursoListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./curso-form/curso-form').then(m => m.CursoFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./curso-edit/curso-edit').then(m => m.CursoEditComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./curso-detail/curso-detail').then(m => m.CursoDetailComponent)
  }
];