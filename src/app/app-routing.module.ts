import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/containers/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  { path: 'validate-link', component: HomeComponent },
  {
    path: 'pizzas',
    loadChildren: './pizzas/pizzas.module#PizzasModule'
  },
  { path: '**', redirectTo: 'pizzas' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
