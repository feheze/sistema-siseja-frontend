import { Routes } from '@angular/router';
import { PoloListComponent } from './polo-list/polo-list';
import { PoloDetailComponent } from './polo-detail/polo-detail';
import { PoloFormComponent } from './polo-form/polo-form';

export const polosRoutes: Routes = [
  { path: 'polos', component: PoloListComponent },
  { path: 'polos/new', component: PoloFormComponent },
  { path: 'polos/:id', component: PoloDetailComponent },
];