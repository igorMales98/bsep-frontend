import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit {

  notifier: NotifierService;

  constructor(private router: Router, private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

}
