import { Component } from '@angular/core';
import { SupabaseService } from '../../core/service/supabase.service';
import { Observable } from 'rxjs';
import { UserResponse } from '@supabase/supabase-js';
import { MatDialog } from '@angular/material/dialog';
import { AddClientComponent } from '../../shared/modals/add-client/add-client.component';
import { Router } from '@angular/router';
import { DataService } from '../../core/service/data.service';
import { ClientData } from '../../model/ClientData';


@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.less']
})
export class AdministrationComponent {
  public user$: Observable<UserResponse>
  dataSource: any = [];
  displayedColumns: string[] = ['name', 'subtitle', 'technicianName', 'technicianPhone', 'technicianEmail', 'actions'];
  public selectedClient: ClientData | undefined;

  constructor(
    private supabaseService: SupabaseService,
    private dialog: MatDialog,
    private router: Router,
    private dataService: DataService,
  ) {
    this.user$ = this.supabaseService.getUser();
    this.user$
      .subscribe(() => {
        this.loadData();
      })
  }

  loadData() {
    this.supabaseService.getClients()
      .subscribe(({data, error}) => {
        this.dataSource = data;
        this.selectedClient = this.dataService.activeClient;
      })
  }

  onAddClient() {
    this.openClientDialog()
      .subscribe((data) => {
        this.user$.subscribe((user) => {
          if (!data) return;
          this.supabaseService.addClient(data, user.data.user?.id)
            .subscribe(() => {
              this.loadData();
            })
        })

    })
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSelectClient(element: ClientData, ev: MouseEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    this.dataService.setClientData(element);
    this.loadData();
  }

  onRowClick(row: any) {
    console.log({row})
    this.openClientDialog(row).subscribe((data) => {
      console.log({data})
      if (!data) return;
      this.supabaseService.updateClient(row.id, data)
        .subscribe(() => {
          this.loadData();
        })
    })
  }

  private openClientDialog(data?: ClientData) {
    const dialogRef = this.dialog.open(AddClientComponent, {data: {...data}})
    return dialogRef.afterClosed();
  }

  onDeleteItem(element: ClientData, ev: MouseEvent) {
    if (!element.id) return;
    ev.preventDefault();
    ev.stopPropagation();
    this.supabaseService.deleteClient(element.id)
      .subscribe(() => {
        this.loadData();
      })
  }
}
