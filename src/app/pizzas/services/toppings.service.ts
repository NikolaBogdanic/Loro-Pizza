import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { Topping } from '../models/topping.model';

@Injectable()
export class ToppingsService {
  constructor(private afs: AngularFirestore) {}

  getToppings(): Observable<Topping[]> {
    return this.afs
      .collection('toppings', ref => ref.orderBy('timestamp'))
      .snapshotChanges()
      .pipe(
        map(snapshots => {
          return snapshots.map(snapshot => {
            const topping: Topping = snapshot.payload.doc.data();
            const { timestamp, ...toppingWithoutTimestamp } = topping;
            const id: string = snapshot.payload.doc.id;
            return { id, ...toppingWithoutTimestamp };
          });
        }),
        catchError((error: any) => throwError(error))
      );
  }
}
