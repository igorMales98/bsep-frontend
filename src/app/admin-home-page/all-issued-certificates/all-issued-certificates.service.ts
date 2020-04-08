import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {KeyStoreData} from '../../model/keyStoreData';

@Injectable({
  providedIn: 'root'
})
export class AllIssuedCertificatesService {

constructor(private router: Router, private httpClient: HttpClient) {
  }

  setPassword(keyStoreData: KeyStoreData) {
    return this.httpClient.post('http://localhost:8081/api/keyStoreData/setPassword',keyStoreData);
  }

}
