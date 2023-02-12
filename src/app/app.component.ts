import { Component, Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ConfigDialogComponent, ConfigDialogData, } from './components/config-dialog.component';
import { ClientData } from './model/ClientData';
import { AddIpAddressDialogComponent } from './components/add-ip-address.component';
import { KeyCode, ShortcutService } from './service/shortcut.service';
import { ConfirmResetComponent } from './components/confirm-reset/confirm-reset.component';
import { UserService } from './service/user.service';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

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
  public isAuthorized$: Observable<boolean> = this.userService.authroized;
  public height: number = 400;
  public clientData?: ClientData;

  constructor(
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private shortcutService: ShortcutService,
    private userService: UserService,
    @Inject(DOCUMENT) public document: Document,
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

    this.initLineHeight();
    this.initClientData();
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
    this.persistAddresses();
  }

  public onConfig() {
    this.openConfig();
  }

  public onReload() {
    const frames = this.document.querySelectorAll('iframe');
    console.log({frames})
    this.document.location.reload();
    // frames.forEach((frame) => {
    //   frame?.contentWindow?.location?.reload?.();
    // })
  }

  public onAddAddress() {
    this.openIpAddressDialog();
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
      data: {ipAddress: ''},
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
      const {clientData, height, password} = value;
      this.height = height;
      if (password) {
        this.userService.setPwd(password);
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
      this.persistHeight();
    });
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

  private persistHeight() {
    localStorage.setItem('line-height', JSON.stringify(this.height));
  }

  private persistAddresses() {
    const ipAddr = this.addresses.map(({ip}) => ip);
    localStorage.setItem('addresses', JSON.stringify(ipAddr));
  }

  private resetData() {
    this.clientData = DEFAULT_CLIENT_DATA;
    this.addresses = [];
    this.persistAddresses();
    this.persistClientData();
    this.userService.resetPwd();
    this.userService.logout();
  }

  private initLineHeight() {
    const localHeight = localStorage.getItem('line-height');
    if (!localHeight) {
      this.height = window.innerHeight - 112;
    } else {
      this.height = JSON.parse(localHeight);
    }
  }
}
