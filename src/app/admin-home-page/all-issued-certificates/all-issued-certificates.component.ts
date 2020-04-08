import { Component, OnInit, ViewChild } from '@angular/core';
import {AllIssuedCertificatesService} from './all-issued-certificates.service';
import {Router} from '@angular/router';
import {KeyStoreData} from '../../model/keyStoreData';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-all-issued-certificates',
  templateUrl: './all-issued-certificates.component.html',
  styleUrls: ['./all-issued-certificates.component.css']
})
export class AllIssuedCertificatesComponent implements OnInit {

  @ViewChild('toggleSelf') toggleSELF: MatSlideToggle;
  @ViewChild('toggleCA') toggleCA: MatSlideToggle;
  @ViewChild('toggleEnd') toggleEND: MatSlideToggle;

  keyStoreData: KeyStoreData
  password: string

  selectedSelf = false;
  selectedCa = false;
  selectedEnd = false;

constructor(private router: Router, private allIssuedCertificatesService: AllIssuedCertificatesService) { }

  ngOnInit(): void {
  }

  toggleSelfIssuing() {
    this.toggleSELF.checked = true;
    this.toggleCA.checked = false;
    this.toggleEND.checked = false;
    this.selectedSelf = true;
    this.selectedCa = false;
    this.selectedEnd = false;
  }

  toggleCaIssuing() {
    this.toggleCA.checked = true;
    this.toggleSELF.checked = false;
    this.toggleEND.checked = false;
    this.selectedSelf = false;
    this.selectedCa = true;
    this.selectedEnd = false;
  }

  toggleEndIssuing() {
    this.toggleEND.checked = true;
    this.toggleSELF.checked = false;
    this.toggleCA.checked = false;
    this.selectedSelf = false;
    this.selectedCa = false;
    this.selectedEnd = true;
  }

  setPassword() {
    if (this.selectedSelf) {
      this.keyStoreData.name = "SELF_SIGNED";
    }
    else if (this.selectedCa) {
      this.keyStoreData.name = "INTERMEDIATE";
    }
    else if (this.selectedEnd) {
      this.keyStoreData.name = "END_ENTITY";
    }
    this.keyStoreData.password = this.password;
    alert(".............................................................................................");
    this.allIssuedCertificatesService.setPassword(this.keyStoreData).subscribe(() => {
        this.router.navigate(['/allIssuedCertificates']);
      });
  }

}
