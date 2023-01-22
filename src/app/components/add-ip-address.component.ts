import { Component, Inject, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pwd-dialog',
  template: `
    <div class="add-ip-dialog">
      <h1 mat-dialog-title>Pridat IP adresu</h1>
      <div mat-dialog-content>
        <mat-form-field>
          <mat-label>IP adresa</mat-label>
          <input matInput type="text" [(ngModel)]="data.ipAddress">
        </mat-form-field>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="onNoClick()">Zrusit</button>
        <button mat-button color="primary" [mat-dialog-close]="data.ipAddress" cdkFocusInitial>Pridat</button>
      </div>
    </div>
  `,
  styles: []
})
export class AddIpAddressDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddIpAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ipAddress: string },
  ) {
    const ipRegex = '(\\b25[0-5]|\\b2[0-4][0-9]|\\b[01]?[0-9][0-9]?)(\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@NgModule({
  declarations: [AddIpAddressDialogComponent],
  imports: [
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
  ],
  exports: [AddIpAddressDialogComponent]
})
export class AddIpAddressDialogModule {
}
