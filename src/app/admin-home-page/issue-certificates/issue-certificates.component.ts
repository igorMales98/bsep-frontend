import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatRadioButton} from '@angular/material/radio';
import {MatButtonToggle} from '@angular/material/button-toggle';
import {Router} from '@angular/router';
import {IssuerAndSubjectData} from '../../model/issuerAndSubjectData';
import {IssueCertificatesService} from './issue-certificates.service';

@Component({
  selector: 'app-issue-certificates',
  templateUrl: './issue-certificates.component.html',
  styleUrls: ['./issue-certificates.component.css']
})
export class IssueCertificatesComponent implements OnInit {

  @ViewChild('toggleSelf') toggleSELF: MatSlideToggle;
  @ViewChild('toggleCA') toggleCA: MatSlideToggle;
  @ViewChild('toggleEnd') toggleEND: MatSlideToggle;

  @ViewChild('toggleUser') toggleUSER: MatButtonToggle;
  @ViewChild('toggleSoftwareCompany') toggleSOFTWARECOMPANY: MatButtonToggle;

  selectedSelf = false;
  selectedCa = false;
  selectedEnd = false;

  subjectDataDisplayed = true;
  subjectData: FormGroup;
  issuerData: FormGroup;

  formsHidden = true;
  selectedUser = false;
  selectedSoftwareCompany = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private issueCertificatesService: IssueCertificatesService) {
  }

  ngOnInit(): void {
    this.issuerData = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      organization: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      organizationUnit: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, this.emailDomainValidator]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(9), Validators.maxLength(10)]]
    });

    this.subjectData = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      organization: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      organizationUnit: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, this.emailDomainValidator]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(9), Validators.maxLength(10)]]
    });
  }

  emailDomainValidator(control: FormControl) {
    const email = control.value;
    const [name, domain] = email.split('@');
    if (domain !== 'gmail.com' && domain !== 'yahoo.com' && domain !== 'uns.ac.rs') {
      return {
        emailDomain: {
          parsedDomain: domain
        }
      };
    } else {
      return null;
    }
  }

  toggleSelfIssuing() {
    this.subjectDataDisplayed = false;
    this.toggleSELF.checked = this.toggleSELF.checked !== true;
    this.toggleCA.checked = false;
    this.toggleEND.checked = false;
    this.selectedSelf = true;
    this.selectedCa = false;
    this.selectedEnd = false;
  }

  toggleCaIssuing() {
    this.subjectDataDisplayed = true;
    this.toggleCA.checked = this.toggleSELF.checked !== true;
    this.toggleSELF.checked = false;
    this.toggleEND.checked = false;
    this.selectedSelf = false;
    this.selectedCa = true;
    this.selectedEnd = false;
  }

  toggleEndIssuing() {
    this.subjectDataDisplayed = true;
    this.toggleEND.checked = this.toggleSELF.checked !== true;
    this.toggleSELF.checked = false;
    this.toggleCA.checked = false;
    this.selectedSelf = false;
    this.selectedCa = false;
    this.selectedEnd = true;
  }

  toggleUserE() {
    this.toggleUSER.checked = true;
    this.toggleSOFTWARECOMPANY.checked = false;
    this.formsHidden = false;
    this.selectedUser = true;
    this.selectedSoftwareCompany = false;
  }

  toggleSoftwareCompanyE() {
    this.toggleUSER.checked = false;
    this.toggleSOFTWARECOMPANY.checked = true;
    this.formsHidden = false;
    this.selectedUser = false;
    this.selectedSoftwareCompany = true;
  }

  issueCertificate() {
    const issuerAndSubjectData = new IssuerAndSubjectData(this.issuerData.value.firstName, this.issuerData.value.lastName,
      this.subjectData.value.firstName, this.subjectData.value.lastName);

    this.issueCertificatesService.issueCertificate(issuerAndSubjectData).subscribe(() => {
      this.router.navigate(['/adminHomePage']);
    });
  }
}
