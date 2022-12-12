import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TechnicianData } from '../model/ClientData';
import { CommonModule } from '@angular/common';

const isEmpty = (x: any) => !!x;

@Component({
  selector: 'app-header',
  template: `
      <div class="header">
          <div class="header__branding">
              <h1 class="title">{{ title || '-' }}</h1>
              <h4 class="subtitle">{{ subtitle || '-' }}</h4>
          </div>
          <div *ngIf="technician" class="header__info">
              <div class="title">Technik</div>
              <div>{{technician?.name || '-'}}</div>
              <div>{{technician?.email}}</div>
              <div>{{technician?.phone}}</div>
          </div>
      </div>
  `,
  styles: [
    `.header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 86px;
      padding: 0 32px;
      box-shadow: 1px 4px 17px -4px rgba(0, 0, 0, 0.15);
    }`,
    `.header__branding {}`,
    `.header__info {
      color: #3b3b3b;
      font-size: 14px;
      text-align: end;
    }`,
    `.header__info .title {
      font-weight: bold;
    }`,
    `.header__actions {
      display: flex;
      gap: 16px;
    }`,
    `.title {
      line-height: 100%;
      margin-bottom: 0;
    }`,
    `.subtitle {
      line-height: 100%;
      margin-bottom: 0;

    }`
  ]
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
