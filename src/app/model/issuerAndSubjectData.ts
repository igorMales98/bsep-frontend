import { ExtendedKeyUsage } from './extendedKeyUsage';

export class IssuerAndSubjectData {
  firstName: string;
  lastName: string;
  organization: string;
  organizationUnit: string;
  country: string;
  city: string;
  email: string;
  phone: string;

  firstNameSubject: string;
  lastNameSubject: string;
  organizationSubject: string;
  organizationUnitSubject: string;
  countrySubject: string;
  citySubject: string;
  emailSubject: string;
  phoneSubject: string;

  typeOfEntity: string;
  certificateRole: string;

  keyUsage: boolean[];
  extendedKeyUsage: boolean[];

  constructor(firstName: string, lastName: string, organization: string, organizationUnit: string, country: string, city: string,
              email: string, phone: string, firstNameSubject: string, lastNameSubject: string, organizationSubject: string,
              organizationUnitSubject: string, countrySubject: string, citySubject: string, emailSubject: string, phoneSubject: string,
              typeOfEntity: string, certificateRole: string, keyUsage: boolean[],extendedKeyUsage: boolean[]) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.organization = organization;
    this.organizationUnit = organizationUnit;
    this.country = country;
    this.city = city;
    this.email = email;
    this.phone = phone;

    this.firstNameSubject = firstNameSubject;
    this.lastNameSubject = lastNameSubject;
    this.organizationSubject = organizationSubject;
    this.organizationUnitSubject = organizationUnitSubject;
    this.countrySubject = countrySubject;
    this.citySubject = citySubject;
    this.emailSubject = emailSubject;
    this.phoneSubject = phoneSubject;

    this.typeOfEntity = typeOfEntity;
    this.certificateRole = certificateRole;
 
    this.keyUsage = keyUsage;
    this.extendedKeyUsage = extendedKeyUsage;
  }

}
