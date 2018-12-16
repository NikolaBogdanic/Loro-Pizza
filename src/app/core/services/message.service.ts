import { Injectable, NgZone } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { MessageDialogComponent } from './../components/message-dialog/message-dialog.component';

@Injectable()
export class MessageService {
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private ngZone: NgZone
  ) {}

  openDialog(message, messageType) {
    this.ngZone.run(() => {
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        data: {
          message,
          messageType
        }
      });
    });
  }

  openSnackBar(message) {
    this.snackBar.open(message, '', {
      duration: 4000
    });
  }
}
