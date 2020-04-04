import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from './security/user.service';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SidebarModule} from 'ng-sidebar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { IssueCertificatesComponent } from './admin-home-page/issue-certificates/issue-certificates.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomePageComponent,
    IssueCertificatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SidebarModule,
    MatButtonToggleModule,
    MatSlideToggleModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
