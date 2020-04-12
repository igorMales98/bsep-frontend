import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatRadioButton} from '@angular/material/radio';
import {MatButtonToggle} from '@angular/material/button-toggle';
import {Router} from '@angular/router';
import {IssuerAndSubjectData} from '../../model/issuerAndSubjectData';
import {IssueCertificatesService} from './issue-certificates.service';
import {KeyStoreData} from 'src/app/model/keyStoreData';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  passwordData: FormGroup;
  keyStorePassword: string;
  keyStoreData: KeyStoreData;

  formsHidden = true;
  selectedUser = false;
  selectedSoftwareCompany = false;

  closeResult: string;

  constructor(private router: Router, private formBuilder: FormBuilder, private issueCertificatesService: IssueCertificatesService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {

    this.issueCertificatesService.doesKeyStoreExist('SELF_SIGNED').subscribe(data => {
      if (!data) {
        this.toggleCA.disabled = true;
        this.toggleEND.disabled = true;
      }
    });

    this.issuerData = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      organization: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      organizationUnit: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, this.emailDomainValidator]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(9), Validators.maxLength(10)]]
    });

    this.subjectData = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      organization: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      organizationUnit: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, this.emailDomainValidator]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(9), Validators.maxLength(10)]]
    });

    this.passwordData = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(5)]]
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

    const typeOfEntity = this.getTypeOfEntity();
    const certificateRole = this.getRole();

    let issuerAndSubjectData;

    if (this.toggleUSER.checked === true) {
      issuerAndSubjectData = new IssuerAndSubjectData(this.issuerData.value.firstName, this.issuerData.value.lastName,
        this.issuerData.value.organization, this.issuerData.value.organizationUnit, this.issuerData.value.country,
        this.issuerData.value.city, this.issuerData.value.email, this.issuerData.value.phone, this.subjectData.value.firstName,
        this.subjectData.value.lastName, this.subjectData.value.organization, this.subjectData.value.organizationUnit,
        this.subjectData.value.country, this.subjectData.value.city, this.subjectData.value.email, this.subjectData.value.phone,
        typeOfEntity, certificateRole);
    } else {
      issuerAndSubjectData = new IssuerAndSubjectData(this.issuerData.value.firstName, this.issuerData.value.lastName,
        this.issuerData.value.organization, this.issuerData.value.organizationUnit, this.issuerData.value.country,
        this.issuerData.value.city, this.issuerData.value.email, this.issuerData.value.phone, this.issuerData.value.firstName,
        this.issuerData.value.lastName, this.issuerData.value.organization, this.issuerData.value.organizationUnit,
        this.issuerData.value.country, this.issuerData.value.city, this.issuerData.value.email, this.issuerData.value.phone,
        typeOfEntity, certificateRole);
    }


    this.issueCertificatesService.issueCertificate(issuerAndSubjectData, this.passwordData.value.password).subscribe(() => {
      this.router.navigate(['/adminHomePage']);
      // treba hendlovati unetu pogresnu lozinku (401)
    });
  }

  get fi() {
    return this.issuerData.controls;
  }

  get fs() {
    return this.subjectData.controls;
  }

  getRole() {
    let certificateRole = '';
    if (this.toggleSELF.checked === true) {
      certificateRole = 'SELF_SIGNED';
    } else if (this.toggleCA.checked === true) {
      certificateRole = 'INTERMEDIATE';
    } else if (this.toggleEND.checked === true) {
      certificateRole = 'END_ENTITY';
    }
    return certificateRole;
  }

  getTypeOfEntity() {
    let typeOfEntity = '';
    if (this.toggleUSER.checked === true) {
      typeOfEntity = 'USER';
    } else if (this.toggleSOFTWARECOMPANY.checked === true) {
      typeOfEntity = 'SOFTWARE_COMPANY';
    }
    return typeOfEntity;
  }

  openModal(myModalNoPassword: TemplateRef<any>, myModalYesPassword: TemplateRef<any>) {
    const certificateRole = this.getRole();
    this.issueCertificatesService.doesKeyStoreExist(certificateRole).subscribe(data => {
      if (!data) {

        this.modalService.open(myModalNoPassword, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

        this.keyStoreData.name = certificateRole.toLowerCase();
        this.keyStoreData.password = this.keyStorePassword;
        this.issueCertificatesService.setKeyStorePassword(this.keyStoreData).subscribe();
      } else {
        this.modalService.open(myModalYesPassword, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

    });


  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  checkPassword() {
    const keyStoreData1 = new KeyStoreData(this.getRole().toLowerCase(), this.passwordData.value.password);
    this.issueCertificatesService.checkKeyStorePassword(keyStoreData1).subscribe(data => {
      if (data) {
        this.issueCertificate();
      } else {
        document.getElementById('checkPasswordErrorSpan').hidden = false;
      }
    });
  }
}
