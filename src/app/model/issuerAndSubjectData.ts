export class IssuerAndSubjectData {
  firstName: string;
  lastName: string;

  firstNameSubject: string;
  lastNameSubject: string;

  constructor(firstName: string, lastName: string, firstNameSubject: string, lastNameSubject: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.firstNameSubject = firstNameSubject;
    this.lastNameSubject = lastNameSubject;
  }

}
