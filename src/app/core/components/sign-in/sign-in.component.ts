import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

import { SendEmailLink } from './../../store/auth.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(private store: Store) {}

  sendEmailLink(email: string) {
    this.store.dispatch(new SendEmailLink(email));
  }
}
