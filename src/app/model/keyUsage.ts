export class KeyUsage {
    digitalSignature: boolean;
    nonRepudation: boolean;
    keyEncipherment: boolean;
    dataEncipherment: boolean;
    keyAgreement: boolean;
    keyCertSign: boolean;
    cRLSign: boolean;
    encipherOnly: boolean;
    decipherOnly: boolean;
  
    constructor(digitalSignature: boolean, nonRepudation: boolean, keyEncipherment: boolean, 
        dataEncipherment: boolean, keyAgreement: boolean, keyCertSign:boolean, 
        cRLSign: boolean, encipherOnly: boolean, decipherOnly: boolean) {
        this.digitalSignature = digitalSignature;
        this.nonRepudation = nonRepudation;
        this.keyEncipherment = keyEncipherment;
        this.dataEncipherment = dataEncipherment;
        this.keyAgreement = keyAgreement;
        this.keyCertSign = keyCertSign;
        this.cRLSign = cRLSign;
        this.encipherOnly = encipherOnly;
        this.decipherOnly = decipherOnly;
      }
  
  }
  