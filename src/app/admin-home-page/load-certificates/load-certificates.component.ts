import {Component, OnInit, ViewChild} from '@angular/core';
import {LoadCertificatesService} from './load-certificates.service';
import {Router} from '@angular/router';
import {KeyStoreData} from '../../model/keyStoreData';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-load-certificates',
  templateUrl: './load-certificates.component.html',
  styleUrls: ['./load-certificates.component.css']
})
export class LoadCertificatesComponent implements OnInit {

  @ViewChild('toggleSelf') toggleSELF: MatSlideToggle;
  @ViewChild('toggleCA') toggleCA: MatSlideToggle;
  @ViewChild('toggleEnd') toggleEND: MatSlideToggle;

  keyStoreData: KeyStoreData;
  password: string;

  selectedSelf = false;
  selectedCa = false;
  selectedEnd = false;

  tableShow = true; //sertifikat
  formHidden1 = true; //alias i password

  formLoad: FormGroup;

  constructor(private router: Router, private loadCertificatesService: LoadCertificatesService) {
  }


constructor(private router: Router, private loadCertificatesService: LoadCertificatesService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.formLoad = this.formBuilder.group({
          alias: ['', [Validators.required,Validators.pattern(/^[0-9]*$/)]],
          keyStorePassword: ['', [Validators.required,]]
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

  setPassword() {
    if (this.selectedSelf) {
      this.keyStoreData.name = 'SELF_SIGNED';
    } else if (this.selectedCa) {
      this.keyStoreData.name = 'INTERMEDIATE';
    } else if (this.selectedEnd) {
      this.keyStoreData.name = 'END_ENTITY';
    }
    this.keyStoreData.password = this.password;
    alert('.............................................................................................');
    this.loadCertificatesService.setPassword(this.keyStoreData).subscribe(() => {
      this.router.navigate(['/loadCertificates']);
    });
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

    const password1 = this.formLoad.value.password; //prikazuje kao undefined

    this.tableShow = false;
    this.loadCertificatesService.loadCertificate(role, alias1, password1).subscribe();
  }

  get li() {
      return this.formLoad.controls;
    }

  get ls() {
      return this.formLoad.controls;
    }

}
