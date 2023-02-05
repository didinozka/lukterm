import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TechnicianData } from '../../model/ClientData';
import { CommonModule } from '@angular/common';

const isEmpty = (x: any) => !!x;

@Component({
  selector: 'app-header',
  template: `
      <div class="header">
          <div class="header__lead">
              <div class="header__logo">
                  <img [src]="'assets/images/logo.svg'" alt="ITS firemne logo"/>
              </div>
              <div class="header__branding">
                  <h1 class="title">{{ title || '-' }}</h1>
                  <h4 class="subtitle">{{ subtitle || '-' }}</h4>
              </div>
          </div>
          <div *ngIf="technician" class="header__info">
              <div class="title">Technik</div>
              <div>{{technician?.name || '-'}}</div>
              <div>{{technician?.email}}</div>
              <div>{{technician?.phone}}</div>
          </div>
      </div>
  `,
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  @Input() public title?: string;
  @Input() public subtitle?: string;
  @Input() public technician?: TechnicianData;

  @Output() public addAddress = new EventEmitter();
  @Output() public openConfig = new EventEmitter();
  public isEmpty = isEmpty;
}

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {
}
