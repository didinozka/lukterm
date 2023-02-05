import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, UserResponse } from '@supabase/supabase-js';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientData } from '../../model/ClientData';

@Injectable({providedIn: 'root'})
export class SupabaseService {
  private supabase: SupabaseClient;
  private clientsTable: any;
  private user?: UserResponse;

  constructor() {
    this.supabase = createClient(environment.baseUrl, environment.authKey);
    this.clientsTable = this.supabase.from('clients');
  }

  public getUser() {
    return from(this.supabase.auth.getUser());
  }

  public createAccount(email: string, password: string) {
    return from(this.supabase.auth.signUp({
      email,
      password
    }));
  }

  public signOut() {
    return from(this.supabase.auth.signOut());
  }

  public signIn(email: string, password: string) {
    return from(this.supabase.auth.signInWithPassword({
      email,
      password
    }));
  }

  public getClients() {
    return from(this.supabase.from('clients')
      .select());
  }

  public recoverPwd(email: string) {
    return from(this.supabase.auth.resetPasswordForEmail(email));
  }

  public addClient(data: ClientData, author: any) {
    const {name, subtitle, technicianName, technicianPhone, technicianEmail} = data;
    return from(this.supabase.from('clients').insert({
      name,
      subtitle,
      technicianName,
      technicianPhone,
      technicianEmail,
      author
    }))
  }

  public updateClient(id: number, data: ClientData) {
    const {name, subtitle, technicianName, technicianPhone, technicianEmail} = data;
    return from(this.supabase.from('clients')
      .update({
        name,
        subtitle,
        technicianName,
        technicianPhone,
        technicianEmail,
      }).eq('id', id))
  }

  public deleteClient(id: string) {
    return from(this.supabase.from('clients').delete().eq('id', id))
  }

  signUp(email: string, password: string) {
    return from(this.supabase.auth.signUp({
      email, password
    }));
  }
}
