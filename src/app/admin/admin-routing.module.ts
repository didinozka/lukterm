import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { IsLoggedInGuard } from '../shared/guards/is-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AdministrationComponent,
        canActivate: [IsLoggedInGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [IsLoggedInGuard]
})
export class AdminRoutingModule {
}
