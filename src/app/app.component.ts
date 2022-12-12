import { Component, Sanitizer, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public ipAddress: string = '';
  public addresses: any[] = [];
  height: number = 400;
  width: number = 900;
  isConfig = false;
  password = 'LukasJePan';
  clientName: string = '';

  constructor(private sanitizer: DomSanitizer) {
    this.height = window.innerHeight - 112;
    this.width = window.innerWidth / 2;
  }

  onSubmit() {
    console.log(this.ipAddress)
    // const sanitized = this.sanitizer.sanitize(SecurityContext.URL, this.ipAddress);
    console.log('this.ipAddress', this.ipAddress);
    
    // const sanitized = this.ipAddress;
    const sanitized = this.sanitizer.bypassSecurityTrustResourceUrl(this.ipAddress);
    this.addresses.push(sanitized);
    this.ipAddress = '';
  }

  onConfig() {
    if (this.isConfig) {
      this.isConfig = false;
      return;
    }
    const pwd = prompt('Heslo:')
    if (pwd === this.password) {
      this.isConfig = true;
    }
  }
}
