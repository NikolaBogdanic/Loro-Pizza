import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { AuthState } from './core/store/auth.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgxsModule.forRoot([AuthState]),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.user'
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsLoggerPluginModule.forRoot({
      collapsed: true,
      logger: console
    }),
    AppRoutingModule,
    MaterialModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
