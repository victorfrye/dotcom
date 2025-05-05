interface Certificate {
  name: string;
  issuer: string;
  issueDate: Date;
  expirationDate?: Date;
  url: string;
}

export default Certificate;

export type { Certificate };
