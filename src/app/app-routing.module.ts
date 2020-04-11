import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminHomePageComponent} from './admin-home-page/admin-home-page.component';
import {IssueCertificatesComponent} from './admin-home-page/issue-certificates/issue-certificates.component';
import {LoadCertificatesComponent} from './admin-home-page/load-certificates/load-certificates.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'adminHomePage', component: AdminHomePageComponent},
  {path: 'issueCertificate', component: IssueCertificatesComponent},
  {path: 'loadCertificates', component: LoadCertificatesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
