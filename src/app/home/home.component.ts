import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ClientData } from '../model/ClientData';
import { MatDialog } from '@angular/material/dialog';
import { AddIpAddressDialogComponent } from '../components/add-ip-address.component';
import { DataService } from '../core/service/data.service';
import { SupabaseService } from '../core/service/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  public ipAddress: string = '';
  public addresses: { ip: string; safeUrl: SafeResourceUrl }[] = [];
  height: number = 400;
  clientData?: ClientData = {
    subtitle: '',
    name: '',
    technicianName: '',
    technicianEmail: '',
    technicianPhone: ''
  };

  constructor(
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private dataService: DataService,
    private supabaseService: SupabaseService,
  ) {
    this.height = window.innerHeight - 112;
    this.clientData = this.dataService.activeClient;
    this.addresses = (this.clientData?.ipAddresses ?? [])
      .map((addr) => ({
        ip: addr,
        safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
          addr
        )
      }))
  }


  onLogout() {
    this.supabaseService.signOut()
      .subscribe(() => {
        console.log('logged out')
      })
  }

  // public onSubmit() {
  //   if (!this.ipAddress) {
  //     return;
  //   }
  //   const sanitized = this.sanitizer.bypassSecurityTrustResourceUrl(
  //     this.ipAddress
  //   );
  //   this.addresses.push({
  //     ip: this.ipAddress,
  //     safeUrl: sanitized
  //   });
  //   this.ipAddress = '';
  // }

  public onRemove(index: number) {
    this.dataService.removeAddress(index);
    this.addresses = this.addresses.filter((_, i) => i !== index);
  }

  public onAddAddress() {
    this.openIpAddressDialog();
  }

  private addAddress(ipAddress: string) {
    const sanitized = this.sanitizer.bypassSecurityTrustResourceUrl(
      ipAddress
    );
    this.addresses.push({
      ip: ipAddress,
      safeUrl: sanitized
    });
    this.dataService.addAddress(ipAddress);
  }

  private openIpAddressDialog() {
    const dialog = this.dialog.open(AddIpAddressDialogComponent, {data: {ipAddress: ''}});
    dialog.afterClosed().subscribe((ipAddress) => {
      if (!ipAddress) return;
      this.addAddress(ipAddress);
    })
  }
}
