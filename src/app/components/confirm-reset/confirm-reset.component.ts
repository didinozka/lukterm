import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-reset',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './confirm-reset.component.html',
  styleUrls: ['./confirm-reset.component.less'],
})
export class ConfirmResetComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmResetComponent>) {}
  
  onNoClick() {
    this.dialogRef.close();
  }
}
