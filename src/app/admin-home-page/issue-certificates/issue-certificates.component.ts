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
import {NotifierService} from 'angular-notifier';


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
  keyUsage: FormGroup;
  extendedKeyUsage: FormGroup;
  keyUsageS: FormGroup;
  extendedKeyUsageS: FormGroup;
  keyStorePassword: string;
  keyStoreData: KeyStoreData;

  formsHidden = true;
  selectedUser = false;
  selectedSoftwareCompany = false;

  closeResult: string;

  selfIssuedExists = false;

  allSSandCA: IssuerAndSubjectData[] = [];

  notifier: NotifierService;

  constructor(private router: Router, private formBuilder: FormBuilder, private issueCertificatesService: IssueCertificatesService,
              private modalService: NgbModal, private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {

    this.issueCertificatesService.getAllSSAndCa().subscribe(data => {
      this.allSSandCA = data;
    });

    this.issueCertificatesService.doesKeyStoreExist('SELF_SIGNED').subscribe(data => {
      if (!data) {
        this.toggleCA.disabled = true;
        this.toggleEND.disabled = true;
      } else {
        this.selfIssuedExists = true;
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

    this.keyUsage = this.formBuilder.group({
      digitalSignature: [false, Validators.required],
      nonRepudation: [false, Validators.required],
      keyEncipherment: [false, Validators.required],
      dataEncipherment: [false, Validators.required],
      keyAgreement: [false, Validators.required],
      keyCertSign: [false, Validators.required],
      cRLSign: [false, Validators.required],
      encipherOnly: [false, Validators.required],
      decipherOnly: [false, Validators.required]
    });

    this.extendedKeyUsage = this.formBuilder.group({
      serverAuth: [false, Validators.required],
      clientAuth: [false, Validators.required],
      codeSigning: [false, Validators.required],
      emailProtection: [false, Validators.required],
      timeStamping: [false, Validators.required],
      oCSPSigning: [false, Validators.required]
    });

    this.keyUsageS = this.formBuilder.group({
      digitalSignature: [false, Validators.required],
      nonRepudation: [false, Validators.required],
      keyEncipherment: [false, Validators.required],
      dataEncipherment: [false, Validators.required],
      keyAgreement: [false, Validators.required],
      keyCertSign: [false, Validators.required],
      cRLSign: [false, Validators.required],
      encipherOnly: [false, Validators.required],
      decipherOnly: [false, Validators.required]
    });

    this.extendedKeyUsageS = this.formBuilder.group({
      serverAuth: [false, Validators.required],
      clientAuth: [false, Validators.required],
      codeSigning: [false, Validators.required],
      emailProtection: [false, Validators.required],
      timeStamping: [false, Validators.required],
      oCSPSigning: [false, Validators.required]
    });

    this.passwordData = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  emailDomainValidator(control: FormControl) {
    let email = control.value;
    if (email === null) {
      email = '';
    }
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
    this.toggleSELF.checked = true;
    this.toggleCA.checked = false;
    this.toggleEND.checked = false;

    this.issuerData.enable();
    this.keyUsage.enable();
    this.extendedKeyUsage.enable();
    setTimeout(() => this.issuerData.reset());
    this.keyUsage.reset();
    this.extendedKeyUsage.reset();
    this.subjectDataDisplayed = false;

    this.selectedSelf = true;
    this.selectedCa = false;
    this.selectedEnd = false;
  }

  toggleCaIssuing() {
    this.toggleCA.checked = true;
    this.toggleSELF.checked = false;
    this.toggleEND.checked = false;

    if (this.selfIssuedExists) {
      this.issuerData.disable();
      this.keyUsage.disable();
      this.extendedKeyUsage.disable();
    }
    this.issuerData.reset();
    this.keyUsage.reset();
    this.extendedKeyUsage.reset();
    this.subjectDataDisplayed = true;

    this.selectedSelf = false;
    this.selectedCa = true;
    this.selectedEnd = false;
  }

  toggleEndIssuing() {
    this.toggleEND.checked = true;
    this.toggleSELF.checked = false;
    this.toggleCA.checked = false;

    if (this.selfIssuedExists) {
      this.issuerData.disable();
      this.keyUsage.disable();
      this.extendedKeyUsage.disable();
    }
    this.issuerData.reset();
    this.keyUsage.reset();
    this.extendedKeyUsage.reset();
    this.subjectDataDisplayed = true;

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

    if (!this.toggleSELF.checked === true) {
      let keyusage: boolean[] = new Array();
      keyusage[0] = this.keyUsageS.value.digitalSignature;
      keyusage[1] = this.keyUsageS.value.nonRepudation;
      keyusage[2] = this.keyUsageS.value.keyEncipherment;
      keyusage[3] = this.keyUsageS.value.dataEncipherment;
      keyusage[4] = this.keyUsageS.value.keyAgreement;
      keyusage[5] = this.keyUsageS.value.keyCertSign;
      keyusage[6] = this.keyUsageS.value.cRLSign;
      keyusage[7] = this.keyUsageS.value.encipherOnly;
      keyusage[8] = this.keyUsageS.value.decipherOnly;
      let extendedkeyusage: boolean[] = new Array();
      extendedkeyusage[0] = this.extendedKeyUsageS.value.serverAuth;
      extendedkeyusage[1] = this.extendedKeyUsageS.value.clientAuth;
      extendedkeyusage[2] = this.extendedKeyUsageS.value.codeSigning;
      extendedkeyusage[3] = this.extendedKeyUsageS.value.emailProtection;
      extendedkeyusage[4] = this.extendedKeyUsageS.value.timeStamping;
      extendedkeyusage[5] = this.extendedKeyUsageS.value.oCSPSigning;
  
      issuerAndSubjectData = new IssuerAndSubjectData(this.issuerData.value.firstName, this.issuerData.value.lastName,
        this.issuerData.value.organization, this.issuerData.value.organizationUnit, this.issuerData.value.country,
        this.issuerData.value.city, this.issuerData.value.email, this.issuerData.value.phone, this.subjectData.value.firstName,
        this.subjectData.value.lastName, this.subjectData.value.organization, this.subjectData.value.organizationUnit,
        this.subjectData.value.country, this.subjectData.value.city, this.subjectData.value.email, this.subjectData.value.phone,
        typeOfEntity, certificateRole, keyusage, extendedkeyusage);
    } else {
      let keyusage: boolean[] = new Array();
      keyusage[0] = this.keyUsage.value.digitalSignature;
      keyusage[1] = this.keyUsage.value.nonRepudation;
      keyusage[2] = this.keyUsage.value.keyEncipherment;
      keyusage[3] = this.keyUsage.value.dataEncipherment;
      keyusage[4] = this.keyUsage.value.keyAgreement;
      keyusage[5] = this.keyUsage.value.keyCertSign;
      keyusage[6] = this.keyUsage.value.cRLSign;
      keyusage[7] = this.keyUsage.value.encipherOnly;
      keyusage[8] = this.keyUsage.value.decipherOnly;
      let extendedkeyusage: boolean[] = new Array();
      extendedkeyusage[0] = this.extendedKeyUsage.value.serverAuth;
      extendedkeyusage[1] = this.extendedKeyUsage.value.clientAuth;
      extendedkeyusage[2] = this.extendedKeyUsage.value.codeSigning;
      extendedkeyusage[3] = this.extendedKeyUsage.value.emailProtection;
      extendedkeyusage[4] = this.extendedKeyUsage.value.timeStamping;
      extendedkeyusage[5] = this.extendedKeyUsage.value.oCSPSigning;

      issuerAndSubjectData = new IssuerAndSubjectData(this.issuerData.value.firstName, this.issuerData.value.lastName,
        this.issuerData.value.organization, this.issuerData.value.organizationUnit, this.issuerData.value.country,
        this.issuerData.value.city, this.issuerData.value.email, this.issuerData.value.phone, this.issuerData.value.firstName,
        this.issuerData.value.lastName, this.issuerData.value.organization, this.issuerData.value.organizationUnit,
        this.issuerData.value.country, this.issuerData.value.city, this.issuerData.value.email, this.issuerData.value.phone,
        typeOfEntity, certificateRole, keyusage, extendedkeyusage);
    }

    this.issueCertificatesService.issueCertificate(issuerAndSubjectData, this.passwordData.value.password).subscribe(() => {
        this.showNotification('success', 'You have successfully issued a certificate.');
        this.modalService.dismissAll();
        this.router.navigate(['/adminHomePage']);
      },
      error => {
        this.showNotification('error', error.error);
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

  fillData(issuer: IssuerAndSubjectData) {
    (document.getElementById('inputFirstName') as HTMLInputElement).value = issuer.firstName;
    (document.getElementById('inputLastName') as HTMLInputElement).value = issuer.lastName;
    (document.getElementById('inputOrganization') as HTMLInputElement).value = issuer.organization;
    (document.getElementById('inputOrganizationUnit') as HTMLInputElement).value = issuer.organizationUnit;
    (document.getElementById('inputCountry') as HTMLInputElement).value = issuer.country;
    (document.getElementById('inputCity') as HTMLInputElement).value = issuer.city;
    (document.getElementById('inputEmail') as HTMLInputElement).value = issuer.email;
    (document.getElementById('inputPhone') as HTMLInputElement).value = issuer.phone;
    (document.getElementById('digitalSignatureI') as HTMLInputElement).checked = issuer.keyUsage[0];
    (document.getElementById('nonRepudationI') as HTMLInputElement).checked = issuer.keyUsage[1];
    (document.getElementById('keyEnciphermentI') as HTMLInputElement).checked = issuer.keyUsage[2];
    (document.getElementById('dataEnciphermentI') as HTMLInputElement).checked = issuer.keyUsage[3];
    (document.getElementById('keyAgreementI') as HTMLInputElement).checked = issuer.keyUsage[4];
    (document.getElementById('keyCertSignI') as HTMLInputElement).checked = issuer.keyUsage[5];
    (document.getElementById('cRLSignI') as HTMLInputElement).checked = issuer.keyUsage[6];
    (document.getElementById('encipherOnlyI') as HTMLInputElement).checked = issuer.keyUsage[7];
    (document.getElementById('decipherOnlyI') as HTMLInputElement).checked = issuer.keyUsage[8];
    (document.getElementById('serverAuthI') as HTMLInputElement).checked = issuer.extendedKeyUsage[0];
    (document.getElementById('clientAuthI') as HTMLInputElement).checked = issuer.extendedKeyUsage[1];
    (document.getElementById('codeSigningI') as HTMLInputElement).checked = issuer.extendedKeyUsage[2];
    (document.getElementById('timeStampingI') as HTMLInputElement).checked = issuer.extendedKeyUsage[3];
    (document.getElementById('emailProtectionI') as HTMLInputElement).checked = issuer.extendedKeyUsage[4];
    (document.getElementById('oCSPSigningI') as HTMLInputElement).checked = issuer.extendedKeyUsage[5];

    this.issuerData.value.firstName = issuer.firstName;
    this.issuerData.value.lastName = issuer.lastName;
    this.issuerData.value.organization = issuer.organization;
    this.issuerData.value.organizationUnit = issuer.organizationUnit;
    this.issuerData.value.country = issuer.country;
    this.issuerData.value.city = issuer.city;
    this.issuerData.value.email = issuer.email;
    this.issuerData.value.phone = issuer.phone;
    this.issuerData.value.keyUsage = [false,false,false,false,false,false,false,false,false];
    this.issuerData.value.keyUsage[0] = issuer.keyUsage[0];
    this.issuerData.value.keyUsage[1] = issuer.keyUsage[1];
    this.issuerData.value.keyUsage[2] = issuer.keyUsage[2];
    this.issuerData.value.keyUsage[3] = issuer.keyUsage[3];
    this.issuerData.value.keyUsage[4] = issuer.keyUsage[4];
    this.issuerData.value.keyUsage[5] = issuer.keyUsage[5];
    this.issuerData.value.keyUsage[6] = issuer.keyUsage[6];
    this.issuerData.value.keyUsage[7] = issuer.keyUsage[7];
    this.issuerData.value.keyUsage[8] = issuer.keyUsage[8];
    this.issuerData.value.extendedKeyUsage = [false,false,false,false,false,false];
    this.issuerData.value.extendedKeyUsage[0] = issuer.extendedKeyUsage[0];
    this.issuerData.value.extendedKeyUsage[1] = issuer.extendedKeyUsage[1];
    this.issuerData.value.extendedKeyUsage[2] = issuer.extendedKeyUsage[2];
    this.issuerData.value.extendedKeyUsage[3] = issuer.extendedKeyUsage[3];
    this.issuerData.value.extendedKeyUsage[4] = issuer.extendedKeyUsage[4];
    this.issuerData.value.extendedKeyUsage[5] = issuer.extendedKeyUsage[5]; 
    
    if (!issuer.keyUsage[0])
      (document.getElementById('digitalSignatureS') as HTMLInputElement).disabled = true;
    else
      (document.getElementById('digitalSignatureS') as HTMLInputElement).disabled = false;
    if (!issuer.keyUsage[1])
      (document.getElementById('nonRepudationS') as HTMLInputElement).disabled = true;
    else
      (document.getElementById('nonRepudationS') as HTMLInputElement).disabled = false;    
    if (!issuer.keyUsage[2])
      (document.getElementById('keyEnciphermentS') as HTMLInputElement).disabled = true;
    else
      (document.getElementById('keyEnciphermentS') as HTMLInputElement).disabled = false;    
    if (!issuer.keyUsage[3])
      (document.getElementById('dataEnciphermentS') as HTMLInputElement).disabled = true;
    else
      (document.getElementById('dataEnciphermentS') as HTMLInputElement).disabled = false;
    if (!issuer.keyUsage[4])
      (document.getElementById('keyAgreementS') as HTMLInputElement).disabled = true; 
    else
      (document.getElementById('keyAgreementS') as HTMLInputElement).disabled = false; 
    if (!issuer.keyUsage[5])
      (document.getElementById('keyCertSignS') as HTMLInputElement).disabled = true;
    else
      (document.getElementById('keyCertSignS') as HTMLInputElement).disabled = false;
    if (!issuer.keyUsage[6])
      (document.getElementById('cRLSignS') as HTMLInputElement).disabled = true;
    else
      (document.getElementById('cRLSignS') as HTMLInputElement).disabled = false; 
    if (!issuer.keyUsage[7])
      (document.getElementById('encipherOnlyS') as HTMLInputElement).disabled = true;  
    else
      (document.getElementById('encipherOnlyS') as HTMLInputElement).disabled = false;
    if (!issuer.keyUsage[8])
      (document.getElementById('decipherOnlyS') as HTMLInputElement).disabled = true;  
    else
      (document.getElementById('decipherOnlyS') as HTMLInputElement).disabled = false;
    
    if (!issuer.extendedKeyUsage[0])
    (document.getElementById('serverAuthS') as HTMLInputElement).disabled = true;
  else
    (document.getElementById('serverAuthS') as HTMLInputElement).disabled = false;
  if (!issuer.extendedKeyUsage[1])
    (document.getElementById('clientAuthS') as HTMLInputElement).disabled = true; 
  else
    (document.getElementById('clientAuthS') as HTMLInputElement).disabled = false; 
  if (!issuer.extendedKeyUsage[2])
    (document.getElementById('codeSigningS') as HTMLInputElement).disabled = true;
  else
    (document.getElementById('codeSigningS') as HTMLInputElement).disabled = false;
  if (!issuer.extendedKeyUsage[3])
    (document.getElementById('timeStampingS') as HTMLInputElement).disabled = true;
  else
    (document.getElementById('timeStampingS') as HTMLInputElement).disabled = false; 
  if (!issuer.extendedKeyUsage[4])
    (document.getElementById('emailProtectionS') as HTMLInputElement).disabled = true;  
  else
    (document.getElementById('emailProtectionS') as HTMLInputElement).disabled = false;
  if (!issuer.extendedKeyUsage[5])
    (document.getElementById('oCSPSigningS') as HTMLInputElement).disabled = true;  
  else
    (document.getElementById('oCSPSigningS') as HTMLInputElement).disabled = false;
  }

  hideDropdown() {
    if (this.selectedSelf) {
      return true;
    }

    if (!this.selectedSelf && !this.selectedCa && !this.selectedEnd) {
      return true;
    } else {
      return !this.selectedUser && !this.selectedSoftwareCompany;
    }
  }

  hideIssueBtn() {
    if (this.selectedSelf) {
      return this.issuerData.invalid;
    } else {
      return this.issuerData.invalid || this.subjectData.invalid;
    }
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
}
