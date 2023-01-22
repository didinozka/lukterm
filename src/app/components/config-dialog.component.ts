import { Component, Inject, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ClientData } from '../model/ClientData';
import { MatListModule } from '@angular/material/list';

export interface ConfigDialogData {
  height: number;
  clientData: ClientData;
}

@Component({
  selector: 'app-config-dialog',
  template: `
<!--      <div class="config-dialog">-->
<!--          <h1 mat-dialog-title>Nastavenia</h1>-->
<!--          <div mat-dialog-content>-->
<!--              <mat-form-field>-->
<!--                  <mat-label>Vyska riadka panelu (px)</mat-label>-->
<!--                  <input matInput type="number" [(ngModel)]="data.height">-->
<!--              </mat-form-field>-->
<!--              <mat-form-field appearance="fill">-->
<!--                  <mat-label>Meno klienta</mat-label>-->
<!--                  <input matInput type="text" [(ngModel)]="data.clientData.name">-->
<!--              </mat-form-field>-->
<!--              <mat-form-field appearance="fill">-->
<!--                  <mat-label>Popis klienta</mat-label>-->
<!--                  <input matInput type="text" [(ngModel)]="data.clientData.subtitle">-->
<!--              </mat-form-field>-->
<!--              <mat-form-field appearance="fill">-->
<!--                  <mat-label>Meno technika</mat-label>-->
<!--                  <input matInput type="text" [(ngModel)]="data.clientData.technician.name">-->
<!--              </mat-form-field>-->
<!--              <mat-form-field appearance="fill">-->
<!--                  <mat-label>Tel c. technika</mat-label>-->
<!--                  <input matInput type="text" [(ngModel)]="data.clientData.technician.phone">-->
<!--              </mat-form-field>-->
<!--              <mat-form-field appearance="fill">-->
<!--                  <mat-label>Email technika</mat-label>-->
<!--                  <input matInput type="text" [(ngModel)]="data.clientData.technician.email">-->
<!--              </mat-form-field>-->
<!--          </div>-->
<!--          <div mat-dialog-actions>-->
<!--              <button mat-button (click)="onNoClick()">Zrusit</button>-->
<!--              <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Uloz</button>-->
<!--          </div>-->
<!--      </div>-->
  `,
  styles: [
    `.mat-form-field {
      display: block;
    }`
  ]
})
export class ConfigDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@NgModule({
  declarations: [ConfigDialogComponent],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatListModule
  ],
  exports: [ConfigDialogComponent]
})
export class ConfigDialogModule {
}
