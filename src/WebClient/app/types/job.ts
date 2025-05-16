import Company from '@dotcom/types/company';

export default interface Job {
  company: Company;
  title: string;
  startDate: Date;
  endDate?: Date;
  description: string;
}
