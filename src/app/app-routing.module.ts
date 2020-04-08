import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminHomePageComponent} from './admin-home-page/admin-home-page.component';
import {IssueCertificatesComponent} from './admin-home-page/issue-certificates/issue-certificates.component';
import {AllIssuedCertificatesComponent} from './admin-home-page/all-issued-certificates/all-issued-certificates.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'adminHomePage', component: AdminHomePageComponent},
  {path: 'issueCertificate', component: IssueCertificatesComponent},
  {path: 'allIssuedCertificates', component: AllIssuedCertificatesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
