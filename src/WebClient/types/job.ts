import Company from '@dotcom/types/company';

interface Job {
  company: Company;
  title: string;
  startDate: Date;
  endDate?: Date;
  description: string;
}

export default Job;

export type { Job };
