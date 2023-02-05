import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfigDialogComponent,
  ConfigDialogData,
} from './components/config-dialog.component';
import { ClientData } from './model/ClientData';
import { AddIpAddressDialogComponent } from './components/add-ip-address.component';
import { PwdDialogComponent } from './components/pwd-dialog.component';
import { KeyCode, ShortcutService } from './service/shortcut.service';
import { ConfirmResetComponent } from './components/confirm-reset/confirm-reset.component';

const DEFAULT_CLIENT_DATA = {
  subtitle: '',
  name: '',
  technician: {
    name: '',
    phone: '',
    email: '',
  },
};

const DEFAULT_PWD = 'Richard.134601861';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  public ipAddress: string = '';
  public addresses: { ip: string; safeUrl: SafeResourceUrl }[] = [];
  isConfig = false;
  password?: string;
  height: number = 400;
  clientData?: ClientData;

  constructor(
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private shortcutService: ShortcutService
  ) {
    this.shortcutService.registerShortcut(
      [KeyCode.alt, KeyCode.shift, 'KeyR'],
      () => {
        console.log('reset app');
        const dialog = this.dialog.open(ConfirmResetComponent);
        dialog.afterClosed().subscribe((value) => {
          if (value) {
            this.resetData();
          }
        });
      }
    );

    this.height = window.innerHeight - 112;

    this.initClientData();
    this.initPwd();
    this.restoreAddresses();
  }

  private initClientData() {
    const strData = localStorage.getItem('data');
    if (strData) {
      this.clientData = JSON.parse(strData);
    } else {
      this.clientData = DEFAULT_CLIENT_DATA;
    }
  }

  public onSubmit() {
    if (!this.ipAddress) {
      return;
    }
    const sanitized = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.ipAddress
    );
    this.addresses.push({
      ip: this.ipAddress,
      safeUrl: sanitized,
    });
    this.ipAddress = '';
  }

  public onRemove(index: number) {
    this.addresses = this.addresses.filter((_, i) => i !== index);
  }

  public onConfig() {
    if (this.isConfig) {
      this.isConfig = false;
      return;
    }
    this.openPwdDialog();
  }

  public onAddAddress() {
    this.openIpAddressDialog();
  }

  public openPwdDialog() {
    const dialog = this.dialog.open(PwdDialogComponent, {
      data: {
        pwd: '',
      },
    });
    dialog.afterClosed().subscribe((value) => {
      if (value === this.password) {
        this.openConfig();
      }
    });
  }

  private addAddress(ipAddress: string) {
    const sanitized = this.sanitizer.bypassSecurityTrustResourceUrl(ipAddress);
    this.addresses.push({
      ip: ipAddress,
      safeUrl: sanitized,
    });
  }

  private openIpAddressDialog() {
    const dialog = this.dialog.open(AddIpAddressDialogComponent, {
      data: { ipAddress: '' },
    });
    dialog.afterClosed().subscribe((ipAddress) => {
      if (!ipAddress) return;
      this.addAddress(ipAddress);
      this.persistAddresses();
    });
  }

  private openConfig() {
    const dialog = this.dialog.open(ConfigDialogComponent, {
      data: {
        height: this.height,
        clientData: {
          name: this.clientData?.name,
          subtitle: this.clientData?.subtitle,
          technician: {
            email: this.clientData?.technician?.email,
            name: this.clientData?.technician?.name,
            phone: this.clientData?.technician?.phone,
          },
        } as ClientData,
      },
    });

    dialog.afterClosed().subscribe((value: ConfigDialogData) => {
      if (!value) return;
      const { clientData, height, password } = value;
      this.height = height;
      if (password) {
        this.password = password;
      }
      this.clientData = {
        subtitle: clientData.subtitle,
        technician: {
          phone: clientData.technician?.phone,
          name: clientData.technician?.name,
          email: clientData.technician?.email,
        },
        name: clientData.name,
      };
      this.persistClientData();
      this.persistPwd();
    });
  }

  private initPwd() {
    const strPwd = localStorage.getItem('pwd');
    if (strPwd) {
      this.password = atob(strPwd);
    } else {
      this.password = DEFAULT_PWD;
    }
  }

  private restoreAddresses() {
    const addrStr = localStorage.getItem('addresses');
    if (!addrStr) {
      return;
    }
    const addrArr = JSON.parse(addrStr) as string[];
    addrArr.forEach((ip) => {
      this.addAddress(ip);
    });
  }

  private persistClientData() {
    localStorage.setItem('data', JSON.stringify(this.clientData));
  }

  private persistAddresses() {
    const ipAddr = this.addresses.map(({ ip }) => ip);
    localStorage.setItem('addresses', JSON.stringify(ipAddr));
  }

  private persistPwd() {
    if (!this.password) return;
    localStorage.setItem('pwd', btoa(this.password));
  }

  private resetData() {
    this.clientData = DEFAULT_CLIENT_DATA;
    this.password = DEFAULT_PWD;
    this.persistClientData();
    this.persistPwd();
  }
}
