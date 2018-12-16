import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-remove-dialog',
  templateUrl: './confirm-remove-dialog.component.html',
  styleUrls: ['./confirm-remove-dialog.component.scss']
})
export class ConfirmRemoveDialogComponent {
  name = this.data.name;

  constructor(
    public dialogRef: MatDialogRef<ConfirmRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel() {
    this.dialogRef.close(false);
  }

  onDelete() {
    this.dialogRef.close(true);
  }
}
