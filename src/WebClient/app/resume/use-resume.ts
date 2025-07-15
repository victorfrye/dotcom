'use client';

import { useCallback, useEffect, useReducer } from 'react';

import resumeDocument from '@dotcom/resume/resume.json';
import {
  Certificate,
  Education,
  Entity,
  Experience,
  Skill,
} from '@dotcom/types';

interface EntityRecord {
  name: string;
  location?: string;
  link?: string;
}

interface ExperienceRecord {
  company: EntityRecord;
  title: string;
  startDate: Date;
  endDate?: Date;
  accomplishments?: string[];
}

interface EducationRecord {
  school: EntityRecord;
  degree: string;
  major: string;
  grade?: number;
  startDate: Date;
  endDate?: Date;
  accomplishments?: string[];
}

interface SkillRecord {
  name: string;
  category: string;
}

interface CertificateRecord {
  name: string;
  issuer: EntityRecord;
  startDate: Date;
  endDate?: Date;
  link?: string;
}

interface ResumeDocument {
  $schema: string;
  experience?: ExperienceRecord[];
  education?: EducationRecord[];
  skills?: SkillRecord[];
  certifications?: CertificateRecord[];
}

const toEntity = (entityRecord: EntityRecord): Entity => ({
  name: entityRecord.name,
  location: entityRecord.location,
  link: entityRecord.link,
});

const toCertificate = (cert: CertificateRecord): Certificate => ({
  name: cert.name,
  issuer: toEntity(cert.issuer),
  startDate: new Date(cert.startDate),
  endDate: cert.endDate ? new Date(cert.endDate) : undefined,
  link: cert.link,
});

const toEducation = (edu: EducationRecord): Education => ({
  school: toEntity(edu.school),
  degree: edu.degree,
  major: edu.major,
  grade: edu.grade,
  startDate: new Date(edu.startDate),
  endDate: edu.endDate ? new Date(edu.endDate) : undefined,
  accomplishments: edu.accomplishments ?? [],
});

const toExperience = (exp: ExperienceRecord): Experience => ({
  company: toEntity(exp.company),
  title: exp.title,
  startDate: new Date(exp.startDate),
  endDate: exp.endDate ? new Date(exp.endDate) : undefined,
  accomplishments: exp.accomplishments ?? [],
});

const toSkill = (skill: SkillRecord): Skill => ({
  name: skill.name,
  category: skill.category,
});

interface ResumeState {
  certifications: Certificate[];
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  loading: boolean;
}

type ResumeAction =
  | { type: 'INIT' }
  | { type: 'SUCCESS'; payload: ResumeDocument };

const reducer = (state: ResumeState, action: ResumeAction): ResumeState => {
  switch (action.type) {
    case 'INIT':
      return { ...state, loading: true };
    case 'SUCCESS': {
      const doc = action.payload;
      return {
        ...state,
        certifications:
          doc.certifications?.map((cert) => toCertificate(cert)) ?? [],
        education: doc.education?.map((edu) => toEducation(edu)) ?? [],
        experience: doc.experience?.map((exp) => toExperience(exp)) ?? [],
        skills: doc.skills?.map((skill) => toSkill(skill)) ?? [],
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default function useResume() {
  const [state, dispatch] = useReducer(reducer, {
    certifications: [],
    education: [],
    experience: [],
    skills: [],
    loading: true,
  });

  const fetchResume = useCallback(() => {
    dispatch({ type: 'INIT' });
    const doc: ResumeDocument = resumeDocument as unknown as ResumeDocument;

    dispatch({
      type: 'SUCCESS',
      payload: doc,
    });
  }, []);

  useEffect(() => {
    fetchResume();
  }, [fetchResume]);

  return { ...state };
}
