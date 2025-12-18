import type Entity from '@/resume/entity';

export default interface Certificate {
  name: string;
  issuer: Entity;
  startDate: Date;
  endDate?: Date;
  link?: string;
}
