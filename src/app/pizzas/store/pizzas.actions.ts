import { Pizza } from '../models/pizza.model';

// Load pizzas actions
export class LoadPizzas {
  static readonly type = '[Pizzas] Load Pizzas';
}
export class LoadPizzasSuccess {
  static readonly type = '[Pizzas] Load Pizzas Success';
  constructor(public pizzas: Pizza[]) {}
}
export class LoadPizzasFail {
  static readonly type = '[Pizzas] Load Pizzas Fail';
  constructor(public error?: any) {}
}

// Create pizza actions
export class CreatePizza {
  static readonly type = '[Pizzas] Create Pizza';
  constructor(public pizza: Pizza) {}
}
export class CreatePizzaSuccess {
  static readonly type = '[Pizzas] Create Pizza Success';
  constructor(public pizza: Pizza) {}
}
export class CreatePizzaFail {
  static readonly type = '[Pizzas] Create Pizza Fail';
  constructor(public error?: any) {}
}

// Update pizza actions
export class UpdatePizza {
  static readonly type = '[Pizzas] Update Pizza';
  constructor(public pizza: Pizza) {}
}
export class UpdatePizzaSuccess {
  static readonly type = '[Pizzas] Update Pizza Success';
  constructor(public pizza: Pizza) {}
}
export class UpdatePizzaFail {
  static readonly type = '[Pizzas] Update Pizza Fail';
  constructor(public error?: any) {}
}

// Remove pizza action
export class RemovePizza {
  static readonly type = '[Pizzas] Remove Pizza';
  constructor(public pizza: Pizza) {}
}
export class RemovePizzaSuccess {
  static readonly type = '[Pizzas] Remove Pizza Success';
  constructor(public pizza: Pizza) {}
}
export class RemovePizzaFail {
  static readonly type = '[Pizzas] Remove Pizza Fail';
  constructor(public error?: Pizza) {}
}
