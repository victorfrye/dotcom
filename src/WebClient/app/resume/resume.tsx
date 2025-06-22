'use client';

import { JSX, useCallback } from 'react';

import {
  Subtitle1,
  Tag,
  TagGroup,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

import Certification from '@dotcom/resume/certification';
import Education from '@dotcom/resume/education';
import useResume from '@dotcom/resume/use-resume';
import Workplace from '@dotcom/resume/workplace';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    display: 'flex',
    width: '48%',
    '@media screen and (max-width: 768px)': {
      width: '100%',
    },
    flex: '0 auto',
  },
  sectionTitle: {
    margin: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalSNudge}`,
  },
  image: {
    height: '44px',
    width: '44px',
    borderRadius: '4px',
  },
  header: {
    display: 'flex',
    color: tokens.colorBrandForeground2,
    margin: `${tokens.spacingVerticalNone} auto ${tokens.spacingVerticalNone} ${tokens.spacingHorizontalNone}`,
  },
  bold: {
    fontWeight: 'bold',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    flex: '0 auto',
    flexWrap: 'wrap',
    maxWidth: '100%',
    gap: tokens.spacingVerticalXXXL,
    listStyleType: 'none',
    marginBlock: tokens.spacingVerticalNone,
    paddingInline: tokens.spacingHorizontalNone,
    padding: tokens.spacingVerticalS,
  },
  skills: {
    display: 'flex',
    flexWrap: 'wrap',
    '@media screen and (max-width: 576px)': {
      justifyContent: 'center',
      alignItems: 'center',
    },
    justifyContent: 'start',
    alignItems: 'start',
    gap: tokens.spacingVerticalL,
  },
});

export default function Resume() {
  const styles = useStyles();
  const { jobs, schools, certificates, skills } = useResume();

  const renderEmploymentHistory = useCallback(
    (): JSX.Element[] =>
      jobs.map((job) => {
        return (
          <li key={job.company.name} className={styles.item}>
            {<Workplace job={job} />}
          </li>
        );
      }),
    [jobs, styles]
  );

  const renderEducationHistory = useCallback(
    (): JSX.Element[] =>
      schools.map((school) => (
        <li key={school.name} className={styles.item}>
          {<Education school={school} />}
        </li>
      )),
    [schools, styles]
  );

  const renderCertifications = useCallback(
    (): JSX.Element[] =>
      certificates.map((certification) => (
        <li key={certification.name} className={styles.item}>
          {<Certification certificate={certification} />}
        </li>
      )),
    [certificates, styles]
  );

  const renderSkills = useCallback((): JSX.Element[] => {
    return skills
      .toSorted((a, b) => (a > b ? 1 : -1))
      .map((skill) => {
        return (
          <Tag size="small" shape="circular" key={skill}>
            {skill}
          </Tag>
        );
      });
  }, [skills]);

  return (
    <div className={styles.container}>
      <Subtitle1 as="h3" className={styles.sectionTitle}>
        Employment
      </Subtitle1>
      <ul className={styles.list}>{renderEmploymentHistory()}</ul>

      <Subtitle1 as="h3" className={styles.sectionTitle}>
        Education
      </Subtitle1>
      <ul className={styles.list}>{renderEducationHistory()}</ul>

      <Subtitle1 as="h3" className={styles.sectionTitle}>
        Certifications
      </Subtitle1>
      <ul className={styles.list}>{renderCertifications()}</ul>

      <Subtitle1 as="h3" className={styles.sectionTitle}>
        Skills
      </Subtitle1>
      <TagGroup className={styles.skills}>{renderSkills()}</TagGroup>
    </div>
  );
}
