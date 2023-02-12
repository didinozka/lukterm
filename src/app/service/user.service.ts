import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

const DEFAULT_PWD = 'Richard.134601861';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private pwd?: string;
  private _authorized = new ReplaySubject<boolean>(1);

  constructor() {
    this.initPwd();
  }

  public get authroized() {
    return this._authorized.asObservable();
  }

  public authorize(pwd: string) {
    this._authorized.next(pwd === this.pwd);
    return this.authroized;
  }

  public setPwd(pwd: string) {
    this.pwd = pwd;
    this.persistPwd();
  }

  public logout() {
    this._authorized.next(false);
  }

  public resetPwd() {
    this.pwd = DEFAULT_PWD;
    this.persistPwd();
  }

  private initPwd() {
    const strPwd = localStorage.getItem('pwd');
    if (strPwd) {
      this.pwd = atob(strPwd);
    } else {
      this.pwd = DEFAULT_PWD;
    }
  }

  private persistPwd() {
    if (!this.pwd) return;
    localStorage.setItem('pwd', btoa(this.pwd));
  }
}
