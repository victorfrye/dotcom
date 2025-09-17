import Entity from '@dotcom/resume/entity';

export default interface Experience {
  company: Entity;
  title: string;
  startDate: Date;
  endDate?: Date;
  accomplishments: string[];
}
