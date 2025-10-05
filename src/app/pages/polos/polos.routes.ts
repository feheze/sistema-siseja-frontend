import { Routes } from '@angular/router';
import { PoloListComponent } from './polo-list/polo-list';
import { PoloFormComponent } from './polo-form/polo-form';
import { PoloDetailComponent } from './polo-detail/polo-detail';

export const polosRoutes: Routes = [
  { path: '', component: PoloListComponent },         // Lista de polos
  { path: 'new', component: PoloFormComponent },      // Cadastro de polo
  { path: ':id', component: PoloDetailComponent }     // Detalhe do polo
];