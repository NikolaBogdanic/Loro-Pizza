import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

import { PizzasState } from './../../store/pizzas.state';
import { ToppingsState } from './../../store/toppings.state';
import { Pizza } from './../../models/pizza.model';
import { Topping } from '../../models/topping.model';

@Component({
  selector: 'app-pizzas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent implements OnInit {
  /* @Select(state => {
    const entities = state.pizzasState.entities;
    return Object.keys(entities).map(id => entities[id]);
  })
  pizzas$: Observable<Pizza[]>;

  @Select(state => state.pizzasState.loaded)
  loaded$: Observable<boolean>;

  @Select(state => state.pizzasState.loading)
  loading$: Observable<boolean>;

  @Select(state => state.toppingsState.entities)
  toppingEntities$: Observable<{ [key: string]: Topping }>; */

  @Select(PizzasState.pizzas) pizzas$: Observable<Pizza[]>;
  @Select(PizzasState.loaded) loaded$: Observable<boolean>;
  @Select(PizzasState.loading) loading$: Observable<boolean>;
  @Select(ToppingsState.entities)
  toppingEntities$: Observable<{ [key: string]: Topping }>;

  pizzaWidth: number;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.getPizzaWidth();
  }

  ngOnInit() {
    this.getPizzaWidth();
  }

  getPizzaWidth() {
    this.pizzaWidth = window.innerWidth < 1024 ? 200 : 300;
  }
}
