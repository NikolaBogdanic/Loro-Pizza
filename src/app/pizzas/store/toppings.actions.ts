import { Topping } from '../models/topping.model';

// Load toppings actions
export class LoadToppings {
  static readonly type = '[Toppings] Load Toppings';
}
export class LoadToppingsSuccess {
  static readonly type = '[Toppings] Load Toppings Success';
  constructor(public toppings: Topping[]) {}
}
export class LoadToppingsFail {
  static readonly type = '[Toppings] Load Toppings Fail';
  constructor(public error?: any) {}
}

// Visualize toppings action
export class VisualizeToppings {
  static readonly type = '[Toppings] Visualize Toppings';
  constructor(public selectedToppingIds: string[]) {}
}
