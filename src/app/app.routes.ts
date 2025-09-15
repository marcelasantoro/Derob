import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { SobreComponent } from './pages/sobre/sobre';
import { AtividadesComponent } from './pages/atividades/atividades';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Derob - Home' },
  { path: 'sobre', component: SobreComponent, title: 'Derob - About' },
  { path: 'atividades', component: AtividadesComponent, title: 'Derob - Activities' }
];
