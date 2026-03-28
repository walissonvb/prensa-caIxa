import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'ativos',
    pathMatch: 'full',
  },
  {
    path: 'ativos',
    loadComponent: () => import('./ativos/ativos.page').then( m => m.AtivosPage)
  },
];
