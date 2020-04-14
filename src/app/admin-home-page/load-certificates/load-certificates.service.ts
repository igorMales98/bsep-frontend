import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {KeyStoreData} from '../../model/keyStoreData';
import {CertificateSubject} from '../../model/certificateSubject';

@Injectable({
  providedIn: 'root'
})
export class LoadCertificatesService {

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  loadCertificate(certificateRole: string, alias: string, keyStorePassword: string) {
    return this.httpClient.get<CertificateSubject>('http://localhost:8081/api/keyStoreData/loadCertificate/' + certificateRole +
      '/' + alias + '/' + keyStorePassword);
  }

  downloadCertificate(role: string, keyStorePassword: string, alias: string) {
    this.httpClient.post('http://localhost:8081/api/keyStoreData/download', {role, keyStorePassword, alias}).subscribe();
  }

}
