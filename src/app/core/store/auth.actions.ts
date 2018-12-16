import { User } from './../models/auth.model';

// Send email link action
export class SendEmailLink {
  static type = '[Auth] SendEmailLink';
  constructor(public email: string) {}
}

// Sign in actions
export class SignIn {
  static type = '[Auth] SignIn';
  constructor(public url: string) {}
}
export class SignInSuccess {
  static type = '[Auth] SignInSuccess';
  constructor(public user: User) {}
}

// Sign out actions
export class SignOut {
  static type = '[Auth] SignOut';
}
export class SignOutSuccess {
  static type = '[Auth] SignOutSuccess';
}
