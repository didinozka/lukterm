import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-action-header',
  template: `
      <div class="header">
          <div class="header__actions">
              <button mat-raised-button color="primary" (click)="addAddress.emit()">
                  <mat-icon>add</mat-icon>
                  Pridat IP adresu
              </button>
              <button mat-raised-button (click)="openConfig.emit()">
                  <mat-icon>settings</mat-icon>
                  Nastavenia
              </button>
          </div>
      </div>
  `,
  styles: [
    `.header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 16px 32px;
    }`,
    `.header__actions {
      display: flex;
      gap: 16px;
    }`,
  ]
})
export class ActionHeaderComponent {
  @Output() public addAddress = new EventEmitter();
  @Output() public openConfig = new EventEmitter();
}

@NgModule({
  declarations: [ActionHeaderComponent],
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  exports: [ActionHeaderComponent]
})
export class ActionHeaderModule {
}
