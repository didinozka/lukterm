import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

const DEFAULT_PWD = 'Richard.134601861';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private pwd: string;
  private _authorized = new ReplaySubject<boolean>(1);

  constructor() {
    const localPwd = localStorage.getItem('pwd-data');
    if (localPwd) {
      this.pwd = atob(localPwd);
    } else {
      this.pwd = DEFAULT_PWD;
    }
  }

  public get authroized() {
    return this._authorized.asObservable();
  }

  public authorize(pwd: string) {
    this._authorized.next(pwd === this.pwd);
    return this.authroized;
  }

  logout() {
    this._authorized.next(false);
  }
}
