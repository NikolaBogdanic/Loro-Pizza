import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';
import { Store, Select } from '@ngxs/store';

import { PizzasState } from './../store/pizzas.state';
import * as pizzasActions from './../store/pizzas.actions';

@Injectable({
  providedIn: 'root'
})
export class PizzasGuard implements CanActivate {
  @Select(PizzasState.loaded) loaded$: Observable<boolean>;

  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
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
