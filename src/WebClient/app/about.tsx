'use client';

import { JSX, cloneElement, useCallback, useMemo } from 'react';

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
  Title3,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  BriefcaseFilled,
  DesignIdeasColor,
  EditFilled,
  GameChatColor,
  LocationRippleColor,
  MailFilled,
  PeopleHomeColor,
  PhoneLaptopColor,
} from '@fluentui/react-icons';

import useResume from '@dotcom/resume/use-resume';
import { Experience } from '@dotcom/types';

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
  url: string;
}

export default function About() {
  const styles = useStyles();
  const today: Date = useMemo(() => new Date(), []);

  const { experience } = useResume();
  const currentJob: Experience = useMemo(() => experience[0], [experience]);
  const careerStart: Date = useMemo(
    () => experience[experience.length - 1]?.startDate ?? undefined,
    [experience]
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
        title: 'Hello from Grand Rapids!',
        text: "I'm Victor, your friendly neighborhood developer. Born, raised, and active in West Michigan, I have a passion for technology and the community. If you are local, let's connect and chat about tech, gaming, or anything else over a cup of coffee!",
        action: {
          icon: <MailFilled />,
          text: 'Contact Me',
          url: 'mailto:victorfrye@outlook.com',
        },
      },
      {
        icon: <PhoneLaptopColor />,
        title: 'Developer by Day',
        text: `I currently work professionally as a ${currentJob?.title} at ${currentJob?.company?.name}. With ${getYearsOfExperience()} years of experience, my specialties include web application development with .NET and React, cloud architecture with Azure, and DevOps automation for developer productivity.`,
        action: {
          icon: <BriefcaseFilled />,
          text: 'View Resume',
          url: '/resume',
        },
      },
      {
        icon: <DesignIdeasColor />,
        title: 'Community Contributor',
        text: "I love connecting with the developer community and growing together. Whether it's through blogging, speaking at events, or one-on-one conversations, you will find me engaged with others who share my passion for technology and innovation.",
        action: {
          icon: <EditFilled />,
          text: 'Read Blog',
          url: '/blog',
        },
      },
      {
        icon: <GameChatColor />,
        title: 'Digital Adventurer',
        text: 'When I leave the keyboard behind, you can find me exploring virtual worlds. Occasionally, I might instead read a fantasy book or go for a run in the great outdoors. Adventure can be found in pixels, pages, or on paths.',
      },
      {
        icon: <PeopleHomeColor />,
        title: 'Supported by Family',
        text: 'I am happily married to my wife, Anna: my best friend, partner in crime, and biggest supporter. Together we have two wild and wonderful dogs, Maya and Gin, who keep our home lively and full of love.',
      },
    ],
    [currentJob, getYearsOfExperience]
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
                        href={content.action.url}
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
