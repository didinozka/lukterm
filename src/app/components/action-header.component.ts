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
  templateUrl: './action-header.component.html',
  styleUrls: ['action-header.component.less']
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
