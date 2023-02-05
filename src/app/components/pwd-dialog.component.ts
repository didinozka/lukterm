import { Component, Inject, NgModule, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pwd-dialog',
  template: `
    <div class="pwd-dialog">
      <div mat-dialog-content>
        <mat-form-field appearance="outline">
          <mat-label>Heslo</mat-label>
          <input matInput type="password" [(ngModel)]="data.pwd" />
        </mat-form-field>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="onNoClick()">Zrusit</button>
        <button
          mat-button
          color="primary"
          [mat-dialog-close]="data.pwd"
          cdkFocusInitial
          type="submit"
        >
          Odoslat
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class PwdDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PwdDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pwd: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@NgModule({
  declarations: [PwdDialogComponent],
  imports: [MatInputModule, MatDialogModule, FormsModule, MatButtonModule],
  exports: [PwdDialogComponent],
})
export class PwdDialogModule {}
