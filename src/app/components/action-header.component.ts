import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SupabaseService } from '../core/service/supabase.service';
import { UserResponse } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-action-header',
  template: `
      <div class="header">
          <div *ngIf="user$ | async as user" class="header__actions">
              <button *ngIf="user?.data?.user" mat-raised-button color="primary" (click)="addAddress.emit()">
                  <mat-icon>add</mat-icon>
                  Pridat IP adresu
              </button>
              <button mat-raised-button (click)="onAdmin()">
                  <mat-icon>settings</mat-icon>
              </button>
              <button *ngIf="user?.data?.user" mat-raised-button (click)="logout.emit()">
                  Odhlasit
              </button>
              <!--              <button mat-raised-button (click)="openConfig.emit()">-->
              <!--                  <mat-icon>settings</mat-icon>-->
              <!--                  Nastavenia-->
              <!--              </button>-->
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
  @Output() public logout = new EventEmitter();
  @Output() public openConfig = new EventEmitter();
  public user$: Observable<UserResponse>;

  constructor(
    private router: Router,
    private supabaseService: SupabaseService,
  ) {
    this.user$ = this.supabaseService.getUser();
  }

  onLogin() {
    this.router.navigate(['auth', 'login'])
  }

  onAdmin() {
    this.router.navigate(['admin'])
  }
}

@NgModule({
  declarations: [ActionHeaderComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    AsyncPipe
  ],
  exports: [ActionHeaderComponent]
})
export class ActionHeaderModule {
}
