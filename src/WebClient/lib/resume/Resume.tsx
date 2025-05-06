import { JSX, useCallback } from 'react';

import {
  Card,
  Subtitle1,
  Tag,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

import Certification from '@dotcom/lib/resume/Certification';
import Education from '@dotcom/lib/resume/Education';
import Workplace from '@dotcom/lib/resume/Workplace';
import useResume from '@dotcom/lib/resume/useResume';

const useStyles = makeStyles({
  container: {
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
    color: tokens.colorBrandForeground2,
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
    flexWrap: 'wrap',
    maxWidth: '100%',
    gap: tokens.spacingVerticalXXXL,
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
          <li key={job.company.name} className={styles.container}>
            {<Workplace job={job} />}
          </li>
        );
      }),
    [jobs, styles]
  );

  const renderEducationHistory = useCallback(
    (): JSX.Element[] =>
      schools.map((school) => (
        <li key={school.name} className={styles.container}>
          {<Education school={school} />}
        </li>
      )),
    [schools, styles]
  );

  const renderCertifications = useCallback(
    (): JSX.Element[] =>
      certificates.map((certification) => (
        <li key={certification.name} className={styles.container}>
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
          <li key={skill}>
            <Tag size="small" shape="circular">
              {skill}
            </Tag>
          </li>
        );
      });
  }, [skills]);

  return (
    <Card appearance="subtle" size="small">
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
      <ul className={styles.skills}>{renderSkills()}</ul>
    </Card>
  );
}
