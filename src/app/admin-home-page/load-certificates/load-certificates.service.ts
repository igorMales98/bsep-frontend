import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
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


  withdrawCertificate(certificateEmail: string){
    return this.httpClient.put('http://localhost:8081/api/certificates/withdraw/' + certificateEmail, null);
  }

  getCertificateStatus(certificateEmail: string){
    return this.httpClient.get('http://localhost:8081/api/certificates/getCertificateStatus/' + certificateEmail, {responseType: 'text'});
  }

}
