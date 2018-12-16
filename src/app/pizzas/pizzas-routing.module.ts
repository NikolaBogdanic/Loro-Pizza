import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PizzasComponent } from './containers/pizzas/pizzas.component';
import { PizzaComponent } from './containers/pizza/pizza.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { PizzasGuard } from './guards/pizzas.guard';
import { ToppingsGuard } from './guards/toppings.guard';
import { PizzaExistsGuard } from './guards/pizza-exists.guard';

const pizzasRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, PizzasGuard, ToppingsGuard],
    component: PizzasComponent
  },
  {
    path: 'new',
    canActivate: [AuthGuard, PizzasGuard, ToppingsGuard],
    component: PizzaComponent
  },
  {
    path: ':pizzaId',
    canActivate: [AuthGuard, PizzaExistsGuard, ToppingsGuard],
    component: PizzaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(pizzasRoutes)],
  exports: [RouterModule],
  providers: []
})
export class PizzasRoutingModule {}
