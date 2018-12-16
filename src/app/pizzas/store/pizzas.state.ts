import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import * as pizzasActions from './pizzas.actions';
import { PizzasService } from './../services/pizzas.service';
import { Pizza } from '../models/pizza.model';
import { MessageService } from './../../core/services/message.service';

export interface PizzasStateModel {
  entities: { [id: string]: Pizza };
  loaded: boolean;
  loading: boolean;
}

@State<PizzasStateModel>({
  name: 'pizzasState',
  defaults: {
    entities: {},
    loaded: false,
    loading: false
  }
})
export class PizzasState {
  constructor(
    private pizzaService: PizzasService,
    private messageService: MessageService
  ) {}

  @Selector()
  static pizzas(state: PizzasStateModel) {
    const entities = state.entities;
    return Object.keys(entities).map(id => entities[id]);
  }

  @Selector()
  static entities(state: PizzasStateModel) {
    return state.entities;
  }

  @Selector()
  static loaded(state: PizzasStateModel) {
    return state.loaded;
  }

  @Selector()
  static loading(state: PizzasStateModel) {
    return state.loading;
  }

  @Action(pizzasActions.LoadPizzas)
  loadPizzas(
    ctx: StateContext<PizzasStateModel>,
    action: pizzasActions.LoadPizzas
  ) {
    const state = ctx.getState();
    ctx.patchState({
      loading: true
    });

    return this.pizzaService
      .getPizzas()
      .pipe(
        map((pizzas: Pizza[]) =>
          ctx.dispatch(new pizzasActions.LoadPizzasSuccess(pizzas))
        ),
        catchError(error =>
          ctx.dispatch(new pizzasActions.LoadPizzasFail(error))
        )
      );
  }

  @Action(pizzasActions.LoadPizzasSuccess)
  loadPizzasSuccess(
    ctx: StateContext<PizzasStateModel>,
    action: pizzasActions.LoadPizzasSuccess
  ) {
    const state = ctx.getState();
    const pizzas = action.pizzas;

    const pizzasEntities = pizzas.reduce(
      (entities: { [id: string]: Pizza }, pizza: Pizza) => {
        return {
          ...entities,
          [pizza.id]: pizza
        };
      },
      {
        ...state.entities
      }
    );

    ctx.patchState({
      entities: pizzasEntities,
      loaded: true,
      loading: false
    });
  }

  @Action(pizzasActions.LoadPizzasFail)
  loadPizzasFail(
    ctx: StateContext<PizzasStateModel>,
    action: pizzasActions.LoadPizzasFail
  ) {
    const state = ctx.getState();
    const error = action.error;
    console.log('Error geting pizzas from Firestore', error);

    ctx.patchState({
      loaded: false,
      loading: false
    });

    return of(error);
  }

  @Action(pizzasActions.CreatePizza)
  createPizza(
    ctx: StateContext<PizzasStateModel>,
    action: pizzasActions.CreatePizza
  ) {
    return this.pizzaService
      .createPizza(action.pizza)
      .pipe(
        map((pizza: Pizza) =>
          ctx.dispatch(new pizzasActions.CreatePizzaSuccess(pizza))
        ),
        catchError(error =>
          ctx.dispatch(new pizzasActions.CreatePizzaFail(error))
        )
      );
  }

  @Action(pizzasActions.CreatePizzaSuccess)
  createPizzaSuccess(
    ctx: StateContext<PizzasStateModel>,
    action: pizzasActions.CreatePizzaSuccess
  ) {
    const state = ctx.getState();
    const pizza = action.pizza;

    const entities = {
      ...state.entities,
      [pizza.id]: pizza
    };

    ctx.patchState({
      entities
    });

    const messsage = 'The pizza "' + pizza.name + '" has been saved.';
    this.messageService.openSnackBar(messsage);

    ctx.dispatch(new Navigate(['/pizzas']));
  }

  @Action(pizzasActions.CreatePizzaFail)
  createPizzaFail(
    ctx: StateContext<PizzasStateModel>,
    action: pizzasActions.CreatePizzaFail
  ) {
    const error = action.error;
    console.log(error);
    const messsage = 'Error saving pizza.';
    this.messageService.openSnackBar(messsage);
  }

  @Action(pizzasActions.UpdatePizza)
  updatePizza(
    ctx: StateContext<PizzasStateModel>,
    action: pizzasActions.UpdatePizza
  ) {
    return this.pizzaService
      .updatePizza(action.pizza)
      .pipe(
        map((pizza: Pizza) =>
          ctx.dispatch(new pizzasActions.UpdatePizzaSuccess(pizza))
        ),
        catchError(error =>
          ctx.dispatch(new pizzasActions.UpdatePizzaFail(error))
        )
      );
  }

  @Action(pizzasActions.UpdatePizzaSuccess)
  updatePizzaSuccess(
    ctx: StateContext<PizzasStateModel>,
    action: pizzasActions.UpdatePizzaSuccess
  ) {
    const state = ctx.getState();
    const pizza = action.pizza;

    const pizzasEntities = {
      ...state.entities,
      [pizza.id]: pizza
    };

    ctx.patchState({
      entities: pizzasEntities
    });

    const messsage = 'The pizza "' + pizza.name + '" has been saved.';
    this.messageService.openSnackBar(messsage);

    ctx.dispatch(new Navigate(['/pizzas']));
  }

  @Action(pizzasActions.UpdatePizzaFail)
  updatePizzaFail(
    ctx: StateContext<PizzasStateModel>,
    action: pizzasActions.UpdatePizzaFail
  ) {
    const error = action.error;
    console.log(error);
    const messsage = 'Error saving pizza.';
    this.messageService.openSnackBar(messsage);
  }

  @Action(pizzasActions.RemovePizza)
  removePizza(
    ctx: StateContext<PizzasStateModel>,
    action: pizzasActions.RemovePizza
  ) {
    return this.pizzaService
      .removePizza(action.pizza)
      .pipe(
        map((pizza: Pizza) =>
          ctx.dispatch(new pizzasActions.RemovePizzaSuccess(pizza))
        ),
        catchError(error =>
          ctx.dispatch(new pizzasActions.RemovePizzaFail(error))
        )
      );
  }

  @Action(pizzasActions.RemovePizzaSuccess)
  removePizzaSuccess(
    ctx: StateContext<PizzasStateModel>,
    action: pizzasActions.RemovePizzaSuccess
  ) {
    const state = ctx.getState();
    const pizza = action.pizza;
    const { [pizza.id]: removed, ...pizzasEntities } = state.entities;

    ctx.patchState({
      entities: pizzasEntities
    });

    const messsage = 'The pizza "' + pizza.name + '" has been deleted.';
    this.messageService.openSnackBar(messsage);

    ctx.dispatch(new Navigate(['/pizzas']));
  }

  @Action(pizzasActions.RemovePizzaFail)
  removePizzaFail(
    ctx: StateContext<PizzasStateModel>,
    action: pizzasActions.RemovePizzaFail
  ) {
    const error = action.error;
    console.log(error);
    const messsage = 'Error deleting pizza.';
    this.messageService.openSnackBar(messsage);
  }
}
