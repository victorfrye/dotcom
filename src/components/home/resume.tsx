import { Job, School } from '@dotcom/types';
import {
  Body1,
  Button,
  Card,
  CardHeader,
  Subtitle1,
  Subtitle2,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import {
  Building32Regular,
  Notebook32Regular,
  Open12Regular,
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
      tokens.spacingVerticalSNudge
    ),
  },
  cardImage: {
    color: tokens.colorBrandForeground2,
    ...shorthands.margin(
      tokens.spacingVerticalS,
      tokens.spacingHorizontalNone,
      tokens.spacingVerticalXS
    ),
  },
  header: {
    color: tokens.colorBrandForeground2,
    ...shorthands.margin(
      tokens.spacingVerticalNone,
      'auto',
      tokens.spacingVerticalNone,
      tokens.spacingHorizontalNone
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
  skills: string[];
}

const Resume: React.FC<ResumeProps> = ({ jobs, schools, skills }) => {
  const styles = useStyles();

  const renderCard = (
    headerIcon: JSX.Element,
    headerTitle: string,
    headerSubtitle: string,
    content: JSX.Element,
    footerUrl: string
  ): JSX.Element => {
    return (
      <Card appearance='filled-alternative' size='small'>
        <CardHeader
          image={headerIcon}
          header={
            <Subtitle2 as='h4' className={styles.header}>
              {headerTitle}
            </Subtitle2>
          }
          description={<Body1 as='em'>{headerSubtitle}</Body1>}
          action={
            <Button
              as='a'
              icon={<Open12Regular />}
              appearance='subtle'
              size='small'
              href={footerUrl}
              target='_blank'
              rel='noreferrer noopener'
            />
          }
        />
        {content}
      </Card>
    );
  };

  const getJobDescription = (job: Job): JSX.Element => {
    return (
      <>
        <Body1 as='p'>
          {job.startDate.getFullYear()} -{' '}
          {job.endDate ? job.endDate.getFullYear() : 'Present'}
        </Body1>
        <Body1 as='p'>{job.description}</Body1>
      </>
    );
  };

  const renderJobs = (jobs: Job[]): JSX.Element[] => {
    return jobs.map((job: Job, index: number) => {
      return (
        <li key={index} className={styles.container}>
          {renderCard(
            <Building32Regular className={styles.cardImage} />,
            job.company.name,
            job.title,
            getJobDescription(job),
            job.company.url
          )}
        </li>
      );
    });
  };

  const getSchoolDescription = (school: School): JSX.Element => {
    return (
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
  };

  const renderSchools = (schools: School[]): JSX.Element[] => {
    return schools.map((school: School, index: number) => {
      return (
        <li key={index} className={styles.container}>
          {renderCard(
            <Notebook32Regular className={styles.cardImage} />,
            school.name,
            school.degree,
            getSchoolDescription(school),
            school.url
          )}
        </li>
      );
    });
  };

  const renderSkills = (skills: string[]): JSX.Element[] => {
    return skills.map((skill: string, index: number) => {
      return (
        <li key={index}>
          <Button size='small'>{skill}</Button>
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
        Skills
      </Subtitle1>
      <ul className={styles.skills}>{renderSkills(skills)}</ul>
    </Card>
  );
};

export default Resume;

export { Resume };
