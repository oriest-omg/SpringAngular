import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PersonneServiceService } from 'src/app/service/personne-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {RippleModule} from 'primeng/ripple';
import { AccueilComponent } from './accueil/accueil.component';
import { PersonneViewComponent } from './personne-view/personne-view.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    PersonneViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    InputTextModule,
    TableModule,
    HttpClientModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    RippleModule,
    MessagesModule,
    ConfirmDialogModule,
    ToastrModule.forRoot(),
    AutoCompleteModule
  ],
  providers: [ PersonneServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
