import { FC, JSX, useCallback } from 'react';

import {
  Body1,
  Button,
  Card,
  CardHeader,
  Subtitle1,
  Subtitle2,
  Tag,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  BuildingRegular,
  CertificateRegular,
  HatGraduationRegular,
  OpenRegular,
} from '@fluentui/react-icons';

import useResume from '@dotcom/components/resume/useResume';
import { Certification, Job, School } from '@dotcom/types';

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

const ProfileResume: FC = () => {
  const styles = useStyles();
  const { jobs, schools, certifications, skills } = useResume();

  const renderCard = useCallback(
    (
      headerIcon: JSX.Element,
      headerTitle: string,
      headerSubtitle: string,
      content: JSX.Element | undefined,
      actionUrl: string,
      orientation: 'horizontal' | 'vertical' = 'vertical'
    ): JSX.Element => (
      <Card
        orientation={orientation}
        appearance="filled-alternative"
        size="small"
      >
        <CardHeader
          image={headerIcon}
          header={
            <Subtitle2 as="h4" className={styles.header}>
              {headerTitle}
            </Subtitle2>
          }
          description={<Body1 as="em">{headerSubtitle}</Body1>}
          action={
            <Button
              as="a"
              icon={<OpenRegular />}
              appearance="subtle"
              size="small"
              href={actionUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Open link in new tab"
            />
          }
        />
        {content ?? null}
      </Card>
    ),
    [styles]
  );

  const getJobDescription = (job: Job): JSX.Element => (
    <>
      <Body1 as="p">
        {job.startDate.getFullYear()} -{' '}
        {job.endDate ? job.endDate.getFullYear() : 'Present'}
      </Body1>
      <Body1 as="p">{job.description}</Body1>
    </>
  );

  const renderJobs = useCallback(
    (): JSX.Element[] =>
      jobs.map((job: Job) => {
        return (
          <li key={job.company.name} className={styles.container}>
            {renderCard(
              <BuildingRegular className={styles.image} />,
              job.company.name,
              job.title,
              getJobDescription(job),
              job.company.url
            )}
          </li>
        );
      }),
    [jobs, renderCard, styles]
  );

  const getSchoolDescription = useCallback(
    (school: School): JSX.Element => (
      <>
        <Body1>
          {school.startDate.getFullYear()} -{' '}
          {school.graduationDate
            ? school.graduationDate.getFullYear()
            : 'Present'}
        </Body1>
        <Body1 as="p">{school.description}</Body1>
      </>
    ),
    []
  );

  const renderSchools = useCallback(
    (): JSX.Element[] =>
      schools.map((school: School) => (
        <li key={school.name} className={styles.container}>
          {renderCard(
            <HatGraduationRegular className={styles.image} />,
            school.name,
            school.degree,
            getSchoolDescription(school),
            school.url
          )}
        </li>
      )),
    [schools, getSchoolDescription, renderCard, styles]
  );

  const renderCertifications = useCallback(
    (): JSX.Element[] =>
      certifications.map((certification: Certification) => (
        <li key={certification.name} className={styles.container}>
          {renderCard(
            <CertificateRegular className={styles.image} />,
            certification.name,
            'Issued ' +
              certification.issueDate.toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              }),
            undefined,
            certification.url
          )}
        </li>
      )),
    [certifications, renderCard, styles]
  );

  const renderSkills = useCallback((): JSX.Element[] => {
    return skills.map((skill: string) => {
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
      <ul className={styles.list}>{renderJobs()}</ul>

      <Subtitle1 as="h3" className={styles.sectionTitle}>
        Education
      </Subtitle1>
      <ul className={styles.list}>{renderSchools()}</ul>

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
};

export default ProfileResume;

export { ProfileResume };
