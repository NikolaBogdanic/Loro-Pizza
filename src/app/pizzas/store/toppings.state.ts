import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import * as toppingsActions from './toppings.actions';
import { ToppingsService } from './../services/toppings.service';
import { Topping } from '../models/topping.model';

export interface ToppingsStateModel {
  entities: { [id: string]: Topping };
  selectedToppingIds: string[];
  loaded: boolean;
  loading: boolean;
}

@State<ToppingsStateModel>({
  name: 'toppingsState',
  defaults: {
    entities: {},
    selectedToppingIds: [],
    loaded: false,
    loading: false
  }
})
export class ToppingsState {
  constructor(private toppingsService: ToppingsService) {}

  @Selector()
  static toppings(state: ToppingsStateModel) {
    const entities = state.entities;
    return Object.keys(entities).map(id => entities[id]);
  }

  @Selector()
  static entities(state: ToppingsStateModel) {
    return state.entities;
  }

  @Selector()
  static loaded(state: ToppingsStateModel) {
    return state.loaded;
  }

  @Selector()
  static loading(state: ToppingsStateModel) {
    return state.loading;
  }

  @Action(toppingsActions.LoadToppings)
  loadToppings(
    ctx: StateContext<ToppingsStateModel>,
    action: toppingsActions.LoadToppings
  ) {
    const state = ctx.getState();
    ctx.patchState({
      loading: true
    });
    return this.toppingsService
      .getToppings()
      .pipe(
        map((toppings: Topping[]) =>
          ctx.dispatch(new toppingsActions.LoadToppingsSuccess(toppings))
        ),
        catchError(error =>
          ctx.dispatch(new toppingsActions.LoadToppingsFail(error))
        )
      );
  }

  @Action(toppingsActions.LoadToppingsSuccess)
  loadToppingsSuccess(
    ctx: StateContext<ToppingsStateModel>,
    action: toppingsActions.LoadToppingsSuccess
  ) {
    const state = ctx.getState();
    const toppings = action.toppings;

    const toppingsEntities = toppings.reduce(
      (entities: { [id: string]: Topping }, topping: Topping) => {
        return {
          ...entities,
          [topping.id]: topping
        };
      },
      {
        ...state.entities
      }
    );

    ctx.patchState({
      entities: toppingsEntities,
      loaded: true,
      loading: false
    });
  }

  @Action(toppingsActions.LoadToppingsFail)
  loadToppingsFail(
    ctx: StateContext<ToppingsStateModel>,
    action: toppingsActions.LoadToppingsFail
  ) {
    const state = ctx.getState();
    const error = action.error;
    console.log('Error geting toppings from Firestore', error);

    ctx.patchState({
      loaded: false,
      loading: false
    });

    return of(error);
  }

  @Action(toppingsActions.VisualizeToppings)
  visualizeToppings(
    ctx: StateContext<ToppingsStateModel>,
    action: toppingsActions.VisualizeToppings
  ) {
    ctx.patchState({
      selectedToppingIds: action.selectedToppingIds
    });
  }
}
