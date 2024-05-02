import { Job } from '@dotcom/types';
import {
  Body1,
  Body1Stronger,
  Card,
  Link,
  makeStyles,
  tokens,
  Subtitle1,
  shorthands,
} from '@fluentui/react-components';

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
    ...shorthands.margin(
      tokens.spacingVerticalXS,
      tokens.spacingHorizontalNone,
      tokens.spacingVerticalSNudge,
    ),
  },
});

interface AboutProps {
  currentJob: Job;
  firstJob: Job;
}

const About: React.FC<AboutProps> = ({ currentJob, firstJob }) => {
  const styles = useStyles();
  const _today: Date = new Date();
  const _start: Date = firstJob.startDate;

  const getYearsOfExperience = (): number => {
    if (
      _today.getMonth() < _start.getMonth() ||
      (_today.getMonth() === _start.getMonth() &&
        _today.getDay() < _start.getDay())
    ) {
      return _today.getFullYear() - _start.getFullYear() - 1;
    }

    return _today.getFullYear() - _start.getFullYear();
  };

  return (
    <Card appearance='subtle' className={styles.container} size='small'>
      <Subtitle1 as='h3' className={styles.sectionTitle}>
        Hello from Grand Rapids!
      </Subtitle1>
      <Body1 as='p'>
        <Body1Stronger>
          I&#x27;m Victor, a coffee-powered developer
        </Body1Stronger>
        . With {`${getYearsOfExperience()}`} years of experience in the
        industry, I&#x27;ve worked with a variety of technologies and platforms.
        My current focuses are on web development with{' '}
        <Body1Stronger>React.js</Body1Stronger>, the{' '}
        <Body1Stronger>.NET</Body1Stronger> ecosystem,{' '}
        <Body1Stronger>Azure</Body1Stronger> cloud services, and{' '}
        <Body1Stronger>DevOps</Body1Stronger> automation and processes.
      </Body1>
      <Body1 as='p'>
        I&#x27;m passionate about{' '}
        <Body1Stronger>digital transformation</Body1Stronger>, the{' '}
        <Body1Stronger>developer experience</Body1Stronger>, and constructing
        solutions that help people <Body1Stronger>achieve more</Body1Stronger>.
      </Body1>
      {currentJob && currentJob.company && (
        <Body1 as='p'>
          I&#x27;m currently working as a{' '}
          <Body1Stronger>
            {currentJob.title} at{' '}
            <Link
              as='a'
              inline
              href={currentJob.company?.url}
              target='_blank'
              rel='noreferrer noopener'
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
};

export default About;

export { About };
