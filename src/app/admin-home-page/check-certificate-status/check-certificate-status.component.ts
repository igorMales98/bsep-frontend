import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CheckCertificateStatusService} from './check-certificate-status.service'
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-check-certificate-status',
  templateUrl: './check-certificate-status.component.html',
  styleUrls: ['./check-certificate-status.component.css']
})
export class CheckCertificateStatusComponent implements OnInit {

  formCheck: FormGroup;
  certificateStatus: string;
  notifier: NotifierService;
  empty: boolean;

  constructor(private formBuilder: FormBuilder, private checkCertificateStatusService: CheckCertificateStatusService,
              private notifierService: NotifierService){
    this.notifier = notifierService;
  }


  ngOnInit(): void {
    this.formCheck = this.formBuilder.group({
        alias: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]]
    });
  }
  
  get ls() {
    return this.formCheck.controls;
  }

  checkStatus(){
    this.checkCertificateStatusService.getCertificateStatus(this.formCheck.value.alias).subscribe(data => {
      this.certificateStatus = data;
      this.showNotification('success', 'Certificate status: ' + this.certificateStatus);
      
    },
    error => {
      this.showNotification('error', error.error);
    });
  }

  public showNotification(type: string, message: string): void {
      this.notifier.notify(type, message);
  }


}
