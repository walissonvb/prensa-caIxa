import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ativos',
    pathMatch: 'full',
  },
  {
    path: 'ativos',
    loadComponent: () => import('./ativos/ativos.page').then( m => m.AtivosPage)
  },
  {
    path: 'informacao',
    loadComponent: () => import('./informacao/informacao.page').then( m => m.InformacaoPage)
  },
];
