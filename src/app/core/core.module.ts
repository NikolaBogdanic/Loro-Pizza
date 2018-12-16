import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './containers/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MessageService } from './services/message.service';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule
  ],
  exports: [HeaderComponent, FooterComponent],
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SignInComponent,
    MessageDialogComponent
  ],
  providers: [AuthGuard, MessageService],
  entryComponents: [SignInComponent, MessageDialogComponent]
})
export class CoreModule {}
