'use client';

import {
  Button,
  makeStyles,
  Tooltip,
  tokens,
} from '@fluentui/react-components';
import { MailFilled, RssFilled } from '@fluentui/react-icons';
import { type JSX, useCallback } from 'react';
import {
  BlueskyIcon,
  GitHubIcon,
  LinkedInIcon,
  ThreadsIcon,
  XboxIcon,
} from '@/assets';
import ShellText from '@/shell/text';

interface Social {
  text: string;
  link: string;
  styles?: string;
  image: JSX.Element;
}

const useStyles = makeStyles({
  icon: {
    color: tokens.colorNeutralForeground1,
  },
  svg: {
    width: '20px',
    height: '20px',
  },
  brand: {
    ':hover': {
      backgroundColor: tokens.colorBrandBackground2Hover,
    },
    ':hover:active': {
      backgroundColor: tokens.colorBrandBackground2Pressed,
    },
  },
  neutral: {
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground4Hover,
    },
    ':hover:active': {
      backgroundColor: tokens.colorNeutralBackground4Pressed,
    },
  },
  blue: {
    ':hover': {
      backgroundColor: tokens.colorPaletteBlueBackground2,
    },
    ':hover:active': {
      backgroundColor: tokens.colorPaletteRoyalBlueBackground2,
    },
  },
  green: {
    ':hover': {
      backgroundColor: tokens.colorPaletteGreenBackground2,
    },
    ':hover:active': {
      backgroundColor: tokens.colorPaletteGreenBackground1,
    },
  },
});

export default function SocialButtons() {
  const styles = useStyles();

  const getSocials = useCallback((): Social[] => {
    return [
      {
        text: ShellText.footer.socials.linkedin,
        link: 'https://www.linkedin.com/in/victorfrye',
        styles: styles.blue,
        image: <LinkedInIcon className={styles.svg} />,
      },
      {
        text: ShellText.footer.socials.github,
        link: 'https://github.com/victorfrye',
        styles: styles.neutral,
        image: <GitHubIcon className={styles.svg} />,
      },
      {
        text: ShellText.footer.socials.threads,
        link: 'https://www.threads.com/@thevictorfryeadventure',
        styles: styles.neutral,
        image: <ThreadsIcon className={styles.svg} />,
      },
      {
        text: ShellText.footer.socials.bluesky,
        link: 'https://bsky.app/profile/victorfrye.com',
        styles: styles.blue,
        image: <BlueskyIcon className={styles.svg} />,
      },
      {
        text: ShellText.footer.socials.xbox,
        link: 'https://www.xbox.com/play/user/FrenchFrye6173',
        styles: styles.green,
        image: <XboxIcon className={styles.svg} />,
      },
      {
        text: ShellText.footer.socials.email,
        link: 'mailto:victorfrye@outlook.com',
        styles: styles.brand,
        image: <MailFilled className={styles.icon} height={20} width={20} />,
      },
      {
        text: ShellText.footer.socials.rss,
        link: '/blog/feed/rss.xml',
        styles: styles.brand,
        image: <RssFilled className={styles.icon} height={20} width={20} />,
      },
    ];
  }, [styles]);

  const renderButtons = (): JSX.Element[] => {
    return getSocials().map((social) => (
      <Tooltip
        withArrow
        content={social.text}
        relationship="label"
        key={social.text}
      >
        <Button
          className={social.styles}
          icon={social.image}
          as="a"
          appearance="subtle"
          shape="circular"
          size="large"
          href={social.link}
          target="_blank"
          rel="me noreferrer noopener"
        />
      </Tooltip>
    ));
  };

  return renderButtons();
}
