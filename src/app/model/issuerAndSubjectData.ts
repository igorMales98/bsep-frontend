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

  constructor(firstName: string, lastName: string, organization: string, organizationUnit: string, country: string, city: string,
              email: string, phone: string, firstNameSubject: string, lastNameSubject: string, organizationSubject: string,
              organizationUnitSubject: string,
              countrySubject: string, citySubject: string, emailSubject: string, phoneSubject: string) {
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
  }

}
