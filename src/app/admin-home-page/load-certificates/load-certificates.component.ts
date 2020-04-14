import {Component, OnInit, ViewChild} from '@angular/core';
import {LoadCertificatesService} from './load-certificates.service';
import {Router} from '@angular/router';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CertificateSubject} from '../../model/certificateSubject';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-load-certificates',
  templateUrl: './load-certificates.component.html',
  styleUrls: ['./load-certificates.component.css']
})
export class LoadCertificatesComponent implements OnInit {

  @ViewChild('toggleSelf') toggleSELF: MatSlideToggle;
  @ViewChild('toggleCA') toggleCA: MatSlideToggle;
  @ViewChild('toggleEnd') toggleEND: MatSlideToggle;

  password: string;

  selectedSelf = false;
  selectedCa = false;
  selectedEnd = false;

  tableShow = true;
  formHidden1 = true;

  formLoad: FormGroup;

  certificateInfo: CertificateSubject;
  firstNameSubject: string;
  lastNameSubject: string;
  emailSubject: string;

  notifier: NotifierService;

  constructor(private router: Router, private loadCertificatesService: LoadCertificatesService, private formBuilder: FormBuilder,
              private notifierService: NotifierService) {
    this.notifier = notifierService;
  }


  ngOnInit(): void {
    this.formLoad = this.formBuilder.group({
      alias: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      keyStorePassword: ['', [Validators.required]]
    });
  }

  toggleSelfIssuing() {
    this.toggleSELF.checked = true;
    this.toggleCA.checked = false;
    this.toggleEND.checked = false;
    this.selectedSelf = true;
    this.selectedCa = false;
    this.selectedEnd = false;
    this.formHidden1 = false;
  }

  toggleCaIssuing() {
    this.toggleCA.checked = true;
    this.toggleSELF.checked = false;
    this.toggleEND.checked = false;
    this.selectedSelf = false;
    this.selectedCa = true;
    this.selectedEnd = false;
    this.formHidden1 = false;
  }

  toggleEndIssuing() {
    this.toggleEND.checked = true;
    this.toggleSELF.checked = false;
    this.toggleCA.checked = false;
    this.selectedSelf = false;
    this.selectedCa = false;
    this.selectedEnd = true;
    this.formHidden1 = false;
  }


  loadCertificate() {
    let role = '';
    if (this.selectedSelf) {
      role = 'SELF_SIGNED';
    } else if (this.selectedCa) {
      role = 'INTERMEDIATE';
    } else if (this.selectedEnd) {
      role = 'END_ENTITY';
    }
    const alias1 = this.formLoad.value.alias;

    const password1 = this.formLoad.value.keyStorePassword;

    this.loadCertificatesService.loadCertificate(role, alias1, password1).subscribe(data => {
        this.certificateInfo = data;
        this.tableShow = false;
        const split = this.certificateInfo.name.split(',');
        this.firstNameSubject = split[7].split('=')[1];
        this.lastNameSubject = split[6].split('=')[1];
        this.emailSubject = split[2].split('=')[1];
      },
      error => {
        this.showNotification('error', error.error);
      });
  }

  get li() {
    return this.formLoad.controls;
  }

  get ls() {
    return this.formLoad.controls;
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

}
