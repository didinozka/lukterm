import { AsyncPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, NgModule, Output, } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../service/user.service';
import { Observable } from 'rxjs';
import { PwdDialogComponent } from '../pwd-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-action-header',
  template: `
      <div class="header">
          <div class="header__actions">
              <button
                      *ngIf="isAuthorized$ | async"
                      mat-stroked-button
                      color="primary"
                      (click)="addAddress.emit()"
              >
                  <mat-icon>add</mat-icon>
                  Pridať IP adresu
              </button>
              <button *ngIf="isAuthorized$ | async" mat-stroked-button (click)="openConfig.emit()">
                  <mat-icon>settings</mat-icon>
                  Nastavenia
              </button>
              <button *ngIf="!(isAuthorized$ | async)" mat-stroked-button (click)="onLogin()">
                  <mat-icon>login</mat-icon>
                  Prihlásenie
              </button>
              <button *ngIf="isAuthorized$ | async" mat-stroked-button color="warn" (click)="onLogout()">
                  <mat-icon>logout</mat-icon>
                  Odhlásit
              </button>
              <button mat-stroked-button (click)="reload.emit()">
                  <mat-icon>sync</mat-icon>
                  Načítať
              </button>
          </div>
      </div>
  `,
  styleUrls: ['./action-header.component.less'],
})
export class ActionHeaderComponent {
  @Output() public addAddress = new EventEmitter();
  @Output() public openConfig = new EventEmitter();
  @Output() public reload = new EventEmitter();
  public isAuthorized$: Observable<boolean>;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
    ) {
    this.isAuthorized$ = this.userService.authroized;
  }

  onLogin() {
    const dialog = this.dialog.open(PwdDialogComponent, {
      data: {
        pwd: '',
      },
    });
    dialog.afterClosed().subscribe((value) => {
      this.userService.authorize(value);
    });
  }

  onLogout() {
    this.userService.logout()
  }
}

@NgModule({
  declarations: [ActionHeaderComponent],
  imports: [MatButtonModule, MatIconModule, NgIf, AsyncPipe],
  exports: [ActionHeaderComponent],
})
export class ActionHeaderModule {
}
