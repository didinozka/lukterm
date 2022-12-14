import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ConfigDialogComponent, ConfigDialogData } from './components/config-dialog.component';
import { ClientData } from './model/ClientData';
import { AddIpAddressDialogComponent } from './components/add-ip-address.component';
import { PwdDialogComponent } from './components/pwd-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  public ipAddress: string = '';
  public addresses: { ip: string; safeUrl: SafeResourceUrl }[] = [];
  isConfig = false;
  password = 'JebloMaVeslo.951';
  height: number = 400;
  clientData?: ClientData = {
    subtitle: '',
    name: '',
    technician: {
      name: '',
      phone: '',
      email: ''
    }
  };

  constructor(private sanitizer: DomSanitizer, private dialog: MatDialog) {
    this.height = window.innerHeight - 112;
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
      safeUrl: sanitized
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
        pwd: ''
      }
    });
    dialog.afterClosed().subscribe((value) => {
      if (value === this.password) {
        this.openConfig();
      }
    })
  }

  private addAddress(ipAddress: string) {
    const sanitized = this.sanitizer.bypassSecurityTrustResourceUrl(
      ipAddress
    );
    this.addresses.push({
      ip: ipAddress,
      safeUrl: sanitized
    });
  }

  private openIpAddressDialog() {
    const dialog = this.dialog.open(AddIpAddressDialogComponent, {data: {ipAddress: ''}});
    dialog.afterClosed().subscribe((ipAddress) => {
      if (!ipAddress) return;
      this.addAddress(ipAddress);
    })
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
            phone: this.clientData?.technician?.phone
          }
        } as ClientData
      }
    });

    dialog.afterClosed().subscribe((value: ConfigDialogData) => {
      if (!value) return;
      const {clientData, height} = value;
      this.height = height;
      this.clientData = {
        subtitle: clientData.subtitle,
        technician: {
          phone: clientData.technician?.phone,
          name: clientData.technician?.name,
          email: clientData.technician?.email
        },
        name: clientData.name
      }
    })
  }
}
