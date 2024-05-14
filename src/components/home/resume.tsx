import { Certification, Job, School } from '@dotcom/types';
import {
  Body1,
  Button,
  Card,
  CardHeader,
  Subtitle1,
  Subtitle2,
  makeStyles,
  shorthands,
  Tag,
  tokens,
} from '@fluentui/react-components';
import {
  BuildingRegular,
  CertificateRegular,
  HatGraduationRegular,
  OpenRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    '@media screen and (min-width: 790px)': {
      maxWidth: '640px',
    },
    ...shorthands.flex('auto'),
  },
  sectionTitle: {
    ...shorthands.margin(
      tokens.spacingVerticalXS,
      tokens.spacingHorizontalNone,
      tokens.spacingVerticalSNudge,
    ),
  },
  cardImage: {
    color: tokens.colorBrandForeground2,
    height: '44px',
    width: '44px',
    ...shorthands.borderRadius("4px"),
  },
  header: {
    color: tokens.colorBrandForeground2,
    ...shorthands.margin(
      tokens.spacingVerticalNone,
      'auto',
      tokens.spacingVerticalNone,
      tokens.spacingHorizontalNone,
    ),
  },
  bold: {
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 'auto',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '100%',
    ...shorthands.gap(tokens.spacingVerticalXXXL),
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
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

interface ResumeProps {
  jobs: Job[];
  schools: School[];
  certifications: Certification[];
  skills: string[];
}

const Resume: React.FC<ResumeProps> = ({ jobs, schools, certifications, skills }) => {
  const styles = useStyles();

  const renderCard = (
    headerIcon: JSX.Element,
    headerTitle: string,
    headerSubtitle: string,
    content: JSX.Element | undefined,
    actionUrl: string,
    orientation: 'horizontal' | 'vertical' = 'vertical'
  ): JSX.Element => (
    <Card orientation={orientation} appearance='filled-alternative' size='small'>
      <CardHeader
        image={headerIcon}
        header={<Subtitle2 as='h4' className={styles.header}>
          {headerTitle}
        </Subtitle2>}
        description={<Body1 as='em'>{headerSubtitle}</Body1>}
        action={<Button
          as='a'
          icon={<OpenRegular />}
          appearance='subtle'
          size='small'
          href={actionUrl}
          target='_blank'
          rel='noreferrer noopener'
          aria-label='Open link in new tab' />}
      />
      {content ?? null}
    </Card>
  );

  const getJobDescription = (job: Job): JSX.Element => (
    <>
      <Body1 as='p'>
        {job.startDate.getFullYear()} -{' '}
        {job.endDate ? job.endDate.getFullYear() : 'Present'}
      </Body1>
      <Body1 as='p'>{job.description}</Body1>
    </>
  );

  const renderJobs = (jobs: Job[]): JSX.Element[] => jobs.map((job: Job, index: number) => {
    return (
      <li key={index} className={styles.container}>
        {renderCard(
          <BuildingRegular className={styles.cardImage} />,
          job.company.name,
          job.title,
          getJobDescription(job),
          job.company.url
        )}
      </li>
    );
  });

  const getSchoolDescription = (school: School): JSX.Element => (
    <>
      <Body1>
        {school.startDate.getFullYear()} -{' '}
        {school.graduationDate
          ? school.graduationDate.getFullYear()
          : 'Present'}
      </Body1>
      <Body1 as='p'>{school.description}</Body1>
    </>
  );

  const renderSchools = (schools: School[]): JSX.Element[] => schools.map((school: School, index: number) => {
    return (
      <li key={index} className={styles.container}>
        {renderCard(
          <HatGraduationRegular className={styles.cardImage} />,
          school.name,
          school.degree,
          getSchoolDescription(school),
          school.url
        )}
      </li>
    );
  });

  const renderCertifications = (certifications: Certification[]): JSX.Element[] => {
    return certifications.map((certification: Certification, index: number) => (
      <li key={index} className={styles.container}>
        {renderCard(
          <CertificateRegular className={styles.cardImage} />,
          certification.name,
          "Issued " + certification.issueDate.toLocaleString('default', { month: 'long', year: 'numeric' }),
          undefined,
          certification.url,
          'horizontal'
        )}
      </li>
    ));
  };

  const renderSkills = (skills: string[]): JSX.Element[] => {
    return skills.map((skill: string, index: number) => {
      return (
        <li key={index}>
          <Tag size='small' shape='circular'>{skill}</Tag>
        </li>
      );
    });
  };

  return (
    <Card appearance='subtle' size='small'>
      <Subtitle1 as='h3' className={styles.sectionTitle}>
        Employment
      </Subtitle1>
      <ul className={styles.list}>{renderJobs(jobs)}</ul>
      <Subtitle1 as='h3' className={styles.sectionTitle}>
        Education
      </Subtitle1>
      <ul className={styles.list}>{renderSchools(schools)}</ul>
      <Subtitle1 as='h3' className={styles.sectionTitle}>
        Certifications
      </Subtitle1>
      <ul className={styles.list}>{renderCertifications(certifications)}</ul>
      <Subtitle1 as='h3' className={styles.sectionTitle}>
        Skills
      </Subtitle1>
      <ul className={styles.skills}>{renderSkills(skills)}</ul>
    </Card>
  );
};

export default Resume;

export { Resume };
