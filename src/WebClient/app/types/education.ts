import Entity from '@dotcom/types/entity';

export default interface Education {
  school: Entity;
  degree: string;
  major: string;
  grade?: number;
  startDate: Date;
  endDate?: Date;
  accomplishments: string[];
}
