import Entity from '@dotcom/types/entity';

export default interface Experience {
  company: Entity;
  title: string;
  startDate: Date;
  endDate?: Date;
  accomplishments: string[];
}
