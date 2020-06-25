import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class CheckCertificateStatusService {

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  getCertificateStatus(alias: string){
    return this.httpClient.get('http://localhost:8081/api/certificates/' + alias, {responseType: 'text'});
  }
}
