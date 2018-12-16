import { Pizza } from './../../pizzas/models/pizza.model';

export interface User {
  uid: string;
  email: string;
  pizzas?: Pizza[];
}

export interface AuthStateModel {
  user?: User;
}
