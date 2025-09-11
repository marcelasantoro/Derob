import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { SobreComponent } from './pages/sobre/sobre';
import { AtividadesComponent } from './pages/atividades/atividades';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Tédio Zero - Home' },
  { path: 'sobre', component: SobreComponent, title: 'Tédio Zero - Sobre' },
  { path: 'atividades', component: AtividadesComponent, title: 'Tédio Zero - Atividades' }
];
