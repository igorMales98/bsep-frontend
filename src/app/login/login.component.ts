import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../security/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginRequest} from '../model/loginRequest';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData: FormGroup;
  notifier: NotifierService;

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder,
              private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.userData = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    const loginRequest = new LoginRequest(this.userData.value.username, this.userData.value.password);

    this.userService.login(loginRequest).subscribe(
      () => {
        console.log(localStorage.getItem('user'));
        this.router.navigate(['/adminHomePage']);
        this.showNotification('success', 'Welcome ');
      },
      (err) => {
        this.showNotification('error', 'Wrong username or password. ');
      }
    );
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

}
