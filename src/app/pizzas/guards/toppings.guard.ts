import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';
import { Store, Select } from '@ngxs/store';

import { ToppingsState } from '../store/toppings.state';
import * as toppingsActions from './../store/toppings.actions';

@Injectable({
  providedIn: 'root'
})
export class ToppingsGuard implements CanActivate {
  @Select(ToppingsState.loaded) loaded$: Observable<boolean>;

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
          this.store.dispatch(new toppingsActions.LoadToppings());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
