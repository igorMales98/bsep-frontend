import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {IssuerAndSubjectData} from '../../model/issuerAndSubjectData';

@Injectable({
  providedIn: 'root'
})
export class IssueCertificatesService {

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  issueCertificate(issuerAndSubjectData: IssuerAndSubjectData) {
    return this.httpClient.post('http://localhost:8080/api/certificates/issueCertificate', issuerAndSubjectData);
  }

}
