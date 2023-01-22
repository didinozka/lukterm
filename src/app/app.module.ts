import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderModule } from './components/header.component';
import { ActionHeaderModule } from './components/action-header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AddClientComponent } from './shared/modals/add-client/add-client.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, AddClientComponent],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MatChipsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        HeaderModule,
        ActionHeaderModule,
        AppRoutingModule,
        ReactiveFormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
