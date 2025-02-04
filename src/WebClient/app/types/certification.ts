interface Certification {
  name: string;
  issuer: string;
  issueDate: Date;
  expirationDate?: Date;
  url: string;
}

export default Certification;

export type { Certification };
