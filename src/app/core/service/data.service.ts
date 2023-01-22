import { Injectable } from '@angular/core';
import { ClientData, ClientDataResponse } from '../../model/ClientData';

const CLIENT_DATA = 'CLIENT_DATA';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private clientData?: ClientData;

  constructor() {
    this.clientData = this.getActiveClient();
  }

  public get activeClient() {
    return this.clientData;
  }

  public setClientData(data: ClientData) {
    this.clientData = data;
    this.storeData(data);

  }

  public addAddress(addr: string) {
    if (!this.clientData) return;
    this.clientData.ipAddresses = [
      ...(this.clientData.ipAddresses ?? []),
      addr
    ]
    this.setClientData(this.clientData);
  }

  public removeAddress(atIndex: number) {
    if (!this.clientData?.ipAddresses) return;
    this.clientData.ipAddresses = this.clientData.ipAddresses
      .filter((_, i) => i === atIndex)
    this.setClientData(this.clientData);
  }

  private getActiveClient() {
    const clientData = localStorage.getItem(CLIENT_DATA);
    if (!clientData) return null;
    return JSON.parse(clientData);
  }

  private storeData(data: ClientData) {
    localStorage.setItem(CLIENT_DATA, JSON.stringify(data));
  }
}
