import {Component, OnInit} from '@angular/core';
import {faSignInAlt, faSignOutAlt, faList, faCertificate, faCheck} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {UserService} from './security/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bsepkt1-front';
  faLogin = faSignInAlt;
  faLogout = faSignOutAlt;
  faList = faList;
  faCertificate = faCertificate;
  faCheckStatus = faCheck;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  checkLoggedIn() {
    return this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout();
  }
}
