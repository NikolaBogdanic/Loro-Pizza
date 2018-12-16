import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap, filter, take } from 'rxjs/operators';
import { Store, Select } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { PizzasState } from './../store/pizzas.state';
import * as pizzasActions from './../store/pizzas.actions';
import { Pizza } from '../models/pizza.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaExistsGuard implements CanActivate {
  @Select(PizzasState.loaded) loaded$: Observable<boolean>;
  @Select(PizzasState.entities)
  pizzaEntities$: Observable<{ [key: string]: Pizza }>;

  constructor(private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = route.params.pizzaId;
        return this.hasPizza(id);
      })
    );
  }

  hasPizza(id: string): Observable<boolean> {
    return this.pizzaEntities$.pipe(
      map((entities: { [key: string]: Pizza }) => !!entities[id]),
      tap(hasPizza => {
        if (!hasPizza) {
          this.store.dispatch(new Navigate(['/pizzas']));
        }
      }),
      take(1)
    );
  }

  checkStore(): Observable<boolean> {
    return this.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new pizzasActions.LoadPizzas());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
