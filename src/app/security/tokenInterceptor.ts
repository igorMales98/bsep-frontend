import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {UserTokenState} from '../model/userTokenState';
import {UserService} from './user.service';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  userTokenState: UserTokenState;

  constructor(public userService: UserService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.userTokenState = JSON.parse(localStorage.getItem('user'));

    if (this.userTokenState) {
      if (this.userTokenState.accessToken) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.userTokenState.accessToken}`
          }
        });
      }
    }

    return next.handle(request);
  }

}
