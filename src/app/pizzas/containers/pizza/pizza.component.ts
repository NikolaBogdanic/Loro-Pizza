import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { MatDialog } from '@angular/material';

import { ToppingsState } from './../../store/toppings.state';
import { Pizza } from './../../models/pizza.model';
import { Topping } from './../../models/topping.model';
import * as pizzasActions from './../../store/pizzas.actions';
import * as toppingsActions from './../../store/toppings.actions';
import { ConfirmRemoveDialogComponent } from './../../components/confirm-remove-dialog/confirm-remove-dialog.component';

@Component({
  selector: 'app-pizza',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  @Select(state => {
    const entities = state.pizzasState.entities;
    const pizzaId =
      state.router.state.root.firstChild.firstChild.params.pizzaId;
    return entities[pizzaId];
  })
  pizza$: Observable<Pizza>;

  @Select(ToppingsState.toppings) toppings$: Observable<Topping[]>;

  @Select(ToppingsState.entities)
  toppingEntities$: Observable<{ [key: string]: Topping }>;

  @Select(state => {
    const entities = state.pizzasState.entities;
    const pizzaId =
      state.router.state.root.firstChild.firstChild.params.pizzaId;
    const pizza = entities[pizzaId];
    const toppingIds = state.toppingsState.selectedToppingIds;
    return { ...pizza, toppingIds };
  })
  visualizedPizza$: Observable<Pizza>;

  pizzaWidth: number;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.getPizzaWidth();
  }

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit() {
    this.getPizzaWidth();
    this.pizza$.subscribe((pizza: Pizza = null) => {
      const pizzaExists = !!(pizza && pizza.toppingIds);
      const toppingsIds = pizzaExists ? pizza.toppingIds : [];
      this.store.dispatch(new toppingsActions.VisualizeToppings(toppingsIds));
    });
  }

  getPizzaWidth() {
    this.pizzaWidth = window.innerWidth < 1024 ? 200 : 300;
  }

  onSelect(event: string[]) {
    this.store.dispatch(new toppingsActions.VisualizeToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new pizzasActions.CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new pizzasActions.UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const name = event.name;
    const dialogRef = this.dialog.open(ConfirmRemoveDialogComponent, {
      data: { name }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new pizzasActions.RemovePizza(event));
      }
    });
  }
}
