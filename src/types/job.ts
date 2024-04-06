import Company from '@dotcom/types/company';

class Job {
  company: Company;
  title: string;
  startDate: Date;
  endDate: Date | undefined;
  description: string;

  public constructor(
    company: Company,
    title: string,
    startDate: Date,
    endDate: Date | undefined,
    description: string,
  ) {
    this.company = company;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
  }
}

export default Job;

export { Job };
