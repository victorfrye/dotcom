class Certification {
  name: string;
  issuer: string;
  issueDate: Date;
  expirationDate: Date | undefined;
  url: string;

  public constructor(
  name: string,
  issuer: string,
  issueDate: Date,
  expirationDate: Date | undefined,
  url: string,
  ) {
    this.name = name;
    this.issuer = issuer;
    this.issueDate = issueDate;
    this.expirationDate = expirationDate;
    this.url = url;
  }

  // public isActive(): boolean {
  //   return this.expirationDate ? this.expirationDate >= new Date() : true;
  // }
  
}

export default Certification;

export { Certification };
