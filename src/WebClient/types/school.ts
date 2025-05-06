export default interface School {
  name: string;
  degree: string;
  major: string;
  location: string;
  grade?: string;
  startDate: Date;
  graduationDate?: Date;
  description: string;
  url: string;
}
