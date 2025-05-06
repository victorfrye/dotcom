export default interface Certificate {
  name: string;
  issuer: string;
  issueDate: Date;
  expirationDate?: Date;
  url: string;
}
