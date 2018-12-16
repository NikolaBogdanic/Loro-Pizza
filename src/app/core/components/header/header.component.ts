import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store, Select } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { SignInComponent } from './../sign-in/sign-in.component';
import { SignIn, SignOut } from './../../store/auth.actions';
import { AuthState } from './../../store/auth.state';
import { User } from './../../models/auth.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Select(AuthState.user) user$: Observable<User>;

  isValidateLinkPage: boolean;

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog
  ) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isValidateLinkPage = event.url.includes('validate-link');
        if (this.isValidateLinkPage && event.url.includes('signIn')) {
          this.store.dispatch(new SignIn(event.url));
        }
      });
  }

  openSignInDialog() {
    this.dialog.open(SignInComponent);
  }

  signOut() {
    this.store.dispatch(new SignOut());
  }

  navigateToPizzas() {
    this.store.dispatch(new Navigate(['/pizzas']));
  }
}
