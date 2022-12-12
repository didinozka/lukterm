import { Component, Sanitizer, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { PwdDialogComponent } from './components/pwd-dialog.component';
import { ConfigDialogComponent, ConfigDialogData } from './components/config-dialog.component';
import { ClientData } from './model/ClientData';
import { AddIpAddressDialogComponent } from './components/add-ip-address.component';

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
  clientData?: ClientData;

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
    this.openConfig();


    // const dialog = this.dialog.open(PwdDialogComponent, {
    //   data: {
    //     pwd: ''
    //   }
    // });
    // dialog.afterClosed().subscribe((value) => {
    //   if (value === 'asd') {
    //     // if (pwd === 'JebloMaVeslo.951') {
    //     this.openConfig();
    //   }
    // })
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
      this.addAddress(ipAddress);
    })
  }

  private openConfig() {
    // this.isConfig = true;
    const dialog = this.dialog.open(ConfigDialogComponent, {
      data: {
        height: this.height,
        clientData: {
          name: this.clientData?.name,
          subtitle: this.clientData?.subtitle
        } as ClientData
      }
    });

    dialog.afterClosed().subscribe((value: ConfigDialogData) => {
      if (!value) return;
      const {clientData, height} = value;
      this.height = height;
      this.clientData = {
        subtitle: clientData.subtitle,
        technician: clientData.technician,
        name: clientData.name
      }
    })
  }
}
