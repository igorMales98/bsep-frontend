import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {KeyStoreData} from '../../model/keyStoreData';

@Injectable({
  providedIn: 'root'
})
export class LoadCertificatesService {

constructor(private router: Router, private httpClient: HttpClient) {
  }

  setPassword(keyStoreData: KeyStoreData) {
    return this.httpClient.post('http://localhost:8081/api/keyStoreData/setPassword',keyStoreData);
  }

  loadCertificate(certificateRole: string, alias: string, keyStorePassword: string){
    return this.httpClient.get('http://localhost:8081/api/keyStoreData/loadCertificate/'+certificateRole+'/'+alias+'/'+keyStorePassword);
  }
}
