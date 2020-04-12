import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {IssuerAndSubjectData} from '../../model/issuerAndSubjectData';
import {KeyStoreData} from 'src/app/model/keyStoreData';

@Injectable({
  providedIn: 'root'
})
export class IssueCertificatesService {

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  doesKeyStoreExist(certificateRole: string) {
    return this.httpClient.get('http://localhost:8081/api/keyStoreData/doesKeyStoreExist/' + certificateRole);
  }

  setKeyStorePassword(keyStoreData: KeyStoreData) {
    return this.httpClient.post('http://localhost:8081/api/keyStoreData/setPassword', keyStoreData);
  }

  issueCertificate(issuerAndSubjectData: IssuerAndSubjectData, keyStorePassword: string) {
    return this.httpClient.post('http://localhost:8081/api/certificates/issueCertificate/' + keyStorePassword, issuerAndSubjectData);
  }

  checkKeyStorePassword(keyStoreData: KeyStoreData) {
    return this.httpClient.get('http://localhost:8081/api/keyStoreData/checkPassword/' + keyStoreData.name + '/' + keyStoreData.password);
  }

  getAllSSAndCa() {
    return this.httpClient.get<IssuerAndSubjectData[]>('http://localhost:8081/api/issuersAndSubjects/getSSAndCA');
  }

}
