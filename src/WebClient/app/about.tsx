import { useCallback, useMemo } from 'react';

import {
  Body1,
  Body1Stronger,
  Card,
  Link,
  Subtitle1,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

import { useResume } from '@dotcom/resume';
import { Job } from '@dotcom/types';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  header: {
    fontSize: tokens.fontSizeBase600,
    color: tokens.colorBrandForeground2,
  },
  bold: {
    fontWeight: 'bold',
  },
  sectionTitle: {
    margin: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalSNudge}`,
  },
});

export default function About() {
  const styles = useStyles();
  const today: Date = useMemo(() => new Date(), []);

  const { jobs } = useResume();
  const currentJob: Job = useMemo(() => jobs[0], [jobs]);

  const careerStart: Date = useMemo(
    () => jobs[jobs.length - 1].startDate,
    [jobs]
  );

  const getYearsOfExperience = useCallback((): number => {
    if (
      today.getMonth() < careerStart.getMonth() ||
      (today.getMonth() === careerStart.getMonth() &&
        today.getDay() < careerStart.getDay())
    ) {
      return today.getFullYear() - careerStart.getFullYear() - 1;
    }

    return today.getFullYear() - careerStart.getFullYear();
  }, [careerStart, today]);

  return (
    <Card appearance="subtle" className={styles.container} size="small">
      <Subtitle1 as="h1" className={styles.sectionTitle}>
        Hello from Grand Rapids!
      </Subtitle1>
      <Body1 as="p">
        <Body1Stronger>
          I&#x27;m Victor, your friendly neighborhood developer
        </Body1Stronger>
        . With {`${getYearsOfExperience()}`} years of experience in the
        industry, I&#x27;ve worked with a variety of technologies and platforms.
        My current focuses are on web development with{' '}
        <Body1Stronger>React.js</Body1Stronger> and{' '}
        <Body1Stronger>.NET</Body1Stronger> ecosystems,{' '}
        <Body1Stronger>Azure</Body1Stronger> cloud services,{' '}
        <Body1Stronger>DevOps</Body1Stronger> automation and developer{' '}
        productivity, and emerging <Body1Stronger>AI</Body1Stronger> solutions.
      </Body1>
      <Body1 as="p">
        I&#x27;m passionate about{' '}
        <Body1Stronger>digital transformation</Body1Stronger>, the{' '}
        <Body1Stronger>developer experience</Body1Stronger>, and constructing
        solutions that help people <Body1Stronger>achieve more</Body1Stronger>.
      </Body1>
      {currentJob?.company && (
        <Body1 as="p">
          I&#x27;m currently working as a{' '}
          <Body1Stronger>
            {currentJob.title} at{' '}
            <Link
              as="a"
              href={currentJob.company?.url}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.bold}
            >
              {currentJob.company?.name}
            </Link>
          </Body1Stronger>
          , a {currentJob.company?.description} based in{' '}
          {currentJob.company?.location}. In my downtime, I enjoy{' '}
          <Body1Stronger>gaming</Body1Stronger>,{' '}
          <Body1Stronger>reading</Body1Stronger>, and quality time with{' '}
          <Body1Stronger>my wife and our two dogs</Body1Stronger>.
        </Body1>
      )}
    </Card>
  );
}
