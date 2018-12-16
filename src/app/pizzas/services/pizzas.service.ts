import { Injectable } from '@angular/core';
import { Observable, throwError, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngxs/store';

import { AuthState } from './../../core/store/auth.state';
import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzasService {
  constructor(private afs: AngularFirestore, private store: Store) {}

  getPizzas(): Observable<Pizza[]> {
    const user = this.store.selectSnapshot(AuthState.user);
    const uid = user.uid;
    return this.afs
      .doc(`users/${uid}`)
      .collection('pizzas', ref => ref.orderBy('timestamp'))
      .snapshotChanges()
      .pipe(
        map(snapshots => {
          return snapshots.map(snapshot => {
            const pizza: Pizza = snapshot.payload.doc.data();
            const { timestamp, ...pizzaWithoutTimestamp } = pizza;
            const id: string = snapshot.payload.doc.id;
            return { id, ...pizzaWithoutTimestamp };
          });
        }),
        catchError((error: any) => throwError(error))
      );
  }

  createPizza(pizza: Pizza) {
    const user = this.store.selectSnapshot(AuthState.user);
    const uid = user.uid;
    const promise = this.afs
      .collection(`users/${uid}/pizzas`)
      .add({
        ...pizza,
        timestamp: Date.now()
      })
      .then(docRef => {
        const pizzaWithId = {
          id: docRef.id,
          ...pizza
        };
        return pizzaWithId;
      });
    return from(promise);
  }

  updatePizza(pizza: Pizza): Observable<Pizza> {
    const user = this.store.selectSnapshot(AuthState.user);
    const uid = user.uid;
    const promise = this.afs
      .doc(`users/${uid}/pizzas/${pizza.id}`)
      .update({
        toppingIds: pizza.toppingIds
      })
      .then(() => pizza);
    return from(promise);
  }

  removePizza(pizza: Pizza): Observable<Pizza> {
    const user = this.store.selectSnapshot(AuthState.user);
    const uid = user.uid;
    const promise = this.afs
      .doc(`users/${uid}/pizzas/${pizza.id}`)
      .delete()
      .then(() => pizza);
    return from(promise);
  }
}
