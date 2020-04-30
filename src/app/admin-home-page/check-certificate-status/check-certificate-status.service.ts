import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class CheckCertificateStatusService {

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  getCertificateStatus(alias: string){
    //napisi putanju koja je na beku
    return this.httpClient.get('http://localhost:8081/api/certificates/checkStatus/' + alias, {responseType: 'text'});
  }
}
