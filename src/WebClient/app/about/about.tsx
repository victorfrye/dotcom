'use client';

import {
  Body2,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Carousel,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselSlider,
  CarouselViewport,
  makeStyles,
  Title3,
  tokens,
} from '@fluentui/react-components';
import {
  BriefcaseFilled,
  CodeColor,
  EditFilled,
  GameChatColor,
  HeartColor,
  LocationRippleColor,
  MailFilled,
  PeopleCommunityColor,
} from '@fluentui/react-icons';
import { cloneElement, type JSX, useCallback, useMemo } from 'react';

import AboutText from '@/about/text';
import { type Experience, useResume } from '@/resume';

const useStyles = makeStyles({
  carousel: {
    overflow: 'clip',
  },
  container: {
    display: 'flex',
    maxWidth: '600px',
    gap: tokens.spacingVerticalM,
  },
  card: {
    margin: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    boxShadow: tokens.shadow8,
  },
  image: {
    height: '44px',
    width: '44px',
  },
  title: {
    marginBlock: tokens.spacingVerticalS,
  },
  footer: {
    marginTop: 'auto',
  },
});

interface AboutCardProps {
  icon: JSX.Element;
  title: string;
  text: string;
  action?: AboutCallToActionProps;
}

interface AboutCallToActionProps {
  icon: JSX.Element;
  text: string;
  link: string;
}

export default function About() {
  const styles = useStyles();

  const today: Date = useMemo(() => new Date(), []);

  const { experience } = useResume();
  const currentJob: Experience = useMemo(() => experience[0], [experience]);
  const careerStart: Date = useMemo(
    () => experience[experience.length - 1]?.startDate ?? undefined,
    [experience],
  );

  const getYearsOfExperience = useCallback((): number => {
    if (!careerStart) {
      return 0;
    }

    if (
      today.getMonth() < careerStart.getMonth() ||
      (today.getMonth() === careerStart.getMonth() &&
        today.getDay() < careerStart.getDay())
    ) {
      return today.getFullYear() - careerStart.getFullYear() - 1;
    }

    return today.getFullYear() - careerStart.getFullYear();
  }, [careerStart, today]);

  const AboutContent: AboutCardProps[] = useMemo(
    () => [
      {
        icon: <LocationRippleColor />,
        title: AboutText.card.hello.title,
        text: AboutText.card.hello.text,
        action: {
          icon: <MailFilled />,
          text: AboutText.card.hello.action,
          link: 'mailto:victorfrye@outlook.com',
        },
      },
      {
        icon: <CodeColor />,
        title: AboutText.card.career.title,
        text: currentJob
          ? AboutText.card.career.text(currentJob, getYearsOfExperience())
          : '',
        action: {
          icon: <BriefcaseFilled />,
          text: AboutText.card.career.action,
          link: '/resume',
        },
      },
      {
        icon: <PeopleCommunityColor />,
        title: AboutText.card.community.title,
        text: AboutText.card.community.text,
        action: {
          icon: <EditFilled />,
          text: AboutText.card.community.action,
          link: '/blog',
        },
      },
      {
        icon: <GameChatColor />,
        title: AboutText.card.hobbies.title,
        text: AboutText.card.hobbies.text,
      },
      {
        icon: <HeartColor />,
        title: AboutText.card.family.title,
        text: AboutText.card.family.text,
      },
    ],
    [currentJob, getYearsOfExperience],
  );

  return (
    <div>
      <Carousel align="center" whitespace>
        <CarouselViewport>
          <CarouselSlider cardFocus>
            {AboutContent.map((content) => (
              <CarouselCard key={content.title} className={styles.container}>
                <Card
                  appearance="filled-alternative"
                  size="large"
                  className={styles.card}
                >
                  <CardHeader
                    image={cloneElement(content.icon, {
                      className: styles.image,
                    })}
                    header={
                      <Title3 as="h2" className={styles.title}>
                        {content.title}
                      </Title3>
                    }
                  />

                  <Body2 as="p">{content.text}</Body2>

                  <CardFooter className={styles.footer}>
                    {content.action && (
                      <Button
                        as="a"
                        href={content.action.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        appearance="primary"
                        icon={content.action.icon}
                      >
                        {content.action.text}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </CarouselCard>
            ))}
          </CarouselSlider>
        </CarouselViewport>
        <CarouselNavContainer
          layout="inline"
          next={{ 'aria-label': 'go to next' }}
          prev={{ 'aria-label': 'go to previous' }}
        >
          <CarouselNav>
            {(index) => (
              <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />
            )}
          </CarouselNav>
        </CarouselNavContainer>
      </Carousel>
    </div>
  );
}
