import { isDevMode } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import * as authActions from './auth.actions';
import { AuthStateModel, User } from './../models/auth.model';
import { MessageService } from './../services/message.service';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null
  }
})
export class AuthState {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private messageService: MessageService
  ) {
    const settings = { timestampsInSnapshots: true };
    afs.firestore.settings(settings);
  }

  @Selector()
  static user(state: AuthStateModel) {
    return state.user;
  }

  @Action(authActions.SendEmailLink)
  async sendEmailLink(
    ctx: StateContext<AuthStateModel>,
    action: authActions.SendEmailLink
  ) {
    const rootUrl = isDevMode()
      ? 'http://localhost:4200'
      : window.location.protocol + '//' + window.location.hostname;
    const actionCodeSettings = {
      // Redirect URL
      url: rootUrl + '/validate-link',
      handleCodeInApp: true
    };

    try {
      await this.afAuth.auth.sendSignInLinkToEmail(
        action.email,
        actionCodeSettings
      );
      window.localStorage.setItem('emailForSignIn', action.email);
      this.messageService.openDialog(
        'We sent you an email with a link to sign in to your account.<br> \
         You can safely close this browser tab.',
        'done'
      );
    } catch (error) {
      console.log('Send email link error.', error);
      this.messageService.openDialog(
        'Sorry, we could not send you an email at this time.<br> \
         Please try again later.',
        'error'
      );
    }
  }

  @Action(authActions.SignIn)
  signIn(ctx: StateContext<AuthStateModel>, action: authActions.SignIn) {
    if (this.afAuth.auth.isSignInWithEmailLink(action.url)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      let userDoc: AngularFirestoreDocument<User>;
      let uid;
      let user;
      this.afAuth.auth
        .signInWithEmailLink(email, action.url)
        .then(credential => {
          uid = credential.user.uid;
          window.localStorage.removeItem('emailForSignIn');
          userDoc = this.afs.doc<User>(`users/${uid}`);
          return userDoc.get().toPromise();
        })
        .then(docSnapshot => {
          if (docSnapshot.exists) {
            user = docSnapshot.data();
            return user;
          } else {
            user = {
              uid,
              email
            };
            const batch = this.afs.firestore.batch();
            // Set default pizza 'Margherita'
            const pizzaMargheritaRef = userDoc.collection('pizzas').ref.doc();
            batch.set(pizzaMargheritaRef, {
              name: 'Margherita',
              timestamp: 1541370181990,
              toppingIds: [
                'vsOyTUpta53lRe1ub1FF',
                'JDeTD0gIqm1zknHCxjQM',
                '5j1YGZQWI1rN9zQtj8RQ'
              ]
            });
            // Set default pizza 'Pepperoni'
            const pizzaPepperoniRef = userDoc.collection('pizzas').ref.doc();
            batch.set(pizzaPepperoniRef, {
              name: 'Pepperoni',
              timestamp: 1541370181996,
              toppingIds: [
                'vsOyTUpta53lRe1ub1FF',
                'JDeTD0gIqm1zknHCxjQM',
                '0HPayWAj0ztNCshzehPp'
              ]
            });
            // Set user
            batch.set(userDoc.ref, user);
            // Execute all 'set' operations as a single batch
            return batch.commit();
          }
        })
        .then(() => {
          ctx.dispatch(new authActions.SignInSuccess(user));
        })
        .catch(error => {
          console.log('Sign in error.', error);
          this.messageService.openDialog(
            'Sorry, we could not sign you in at this time.<br> \
             Please try again later.',
            'error'
          );
        });
    } else {
      console.log('Error: isSignInWithEmailLink returned false.');
      this.messageService.openDialog(
        'Sorry, we could not sign you in at this time.<br> \
         Please try again later.',
        'error'
      );
    }
  }

  @Action(authActions.SignInSuccess)
  signInSuccess(
    ctx: StateContext<AuthStateModel>,
    action: authActions.SignInSuccess
  ) {
    const state = ctx.getState();
    const user = action.user;

    ctx.patchState({
      user
    });

    ctx.dispatch(new Navigate(['/pizzas']));
  }

  @Action(authActions.SignOut)
  async signOut(ctx: StateContext<AuthStateModel>) {
    return this.afAuth.auth.signOut().then(() => {
      ctx.dispatch(new authActions.SignOutSuccess());
    });
  }

  @Action(authActions.SignOutSuccess)
  signOutSuccess(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      user: null
    });
    ctx.dispatch(new Navigate(['/']));
  }
}
