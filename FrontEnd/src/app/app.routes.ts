import { Routes } from '@angular/router';
import { MunicipioListaComponent } from './components/municipio-lista.component/municipio-lista.component';

export const routes: Routes = [
  { path: '', redirectTo: 'municipios', pathMatch: 'full' },
  { path: 'municipios', component: MunicipioListaComponent }
];