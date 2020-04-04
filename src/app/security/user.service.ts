import {Injectable} from '@angular/core';
import {UserTokenState} from '../model/userTokenState';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../model/loginRequest';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  accessToken = null;
  request: UserTokenState;
  loggedInUser: Observable<UserTokenState>;
  loggedInUserSubject: BehaviorSubject<UserTokenState>;

  constructor(private router: Router, private httpClient: HttpClient) {
    this.loggedInUserSubject = new BehaviorSubject<UserTokenState>(JSON.parse(localStorage.getItem('user')));
    this.loggedInUser = this.loggedInUserSubject.asObservable();
  }

  login(loginRequest: LoginRequest) {
    return this.httpClient.post('http://localhost:8080/api/auth/login', loginRequest).pipe(map((response: UserTokenState) => {
      this.accessToken = response.accessToken;
      localStorage.setItem('user', JSON.stringify(response));
      this.loggedInUserSubject.next(response);
    }));
  }

  getToken() {
    return this.accessToken;
  }

  getLoggedInUser() {
    return this.loggedInUserSubject.value;
  }

  isLoggedIn() {
    return localStorage.getItem('user') != null;
  }

  logout() {
    localStorage.removeItem('user');
    this.accessToken = null;
    this.router.navigate(['/']);
  }

}
