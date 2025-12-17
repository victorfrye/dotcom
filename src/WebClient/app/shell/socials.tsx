'use client';

import {
  Button,
  Image,
  makeStyles,
  Tooltip,
  tokens,
} from '@fluentui/react-components';
import { MailFilled, RssFilled } from '@fluentui/react-icons';
import { type JSX, useCallback } from 'react';

import ShellText from '@/shell/text';
import { useColorMode } from '@/theme';

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
  const { isDark } = useColorMode();

  const getSocials = useCallback((): Social[] => {
    return [
      {
        text: ShellText.footer.socials.linkedin,
        link: 'https://www.linkedin.com/in/victorfrye',
        styles: styles.blue,
        image: (
          <Image
            src={isDark ? '/assets/linkedin.svg' : '/assets/linkedin_dark.svg'}
            alt={ShellText.footer.socials.linkedin}
            height={20}
            width={20}
          />
        ),
      },
      {
        text: ShellText.footer.socials.github,
        link: 'https://github.com/victorfrye',
        styles: styles.neutral,
        image: (
          <Image
            src={isDark ? '/assets/github.svg' : '/assets/github_dark.svg'}
            alt={ShellText.footer.socials.github}
            height={20}
            width={20}
          />
        ),
      },
      {
        text: ShellText.footer.socials.threads,
        link: 'https://www.threads.com/@thevictorfryeadventure',
        styles: styles.neutral,
        image: (
          <Image
            src={isDark ? '/assets/threads.svg' : '/assets/threads_dark.svg'}
            alt={ShellText.footer.socials.threads}
            height={20}
            width={20}
          />
        ),
      },
      {
        text: ShellText.footer.socials.bluesky,
        link: 'https://bsky.app/profile/victorfrye.com',
        styles: styles.blue,
        image: (
          <Image
            src={isDark ? '/assets/bluesky.svg' : '/assets/bluesky_dark.svg'}
            alt={ShellText.footer.socials.bluesky}
            height={20}
            width={20}
          />
        ),
      },
      {
        text: ShellText.footer.socials.xbox,
        link: 'https://www.xbox.com/play/user/FrenchFrye6173',
        styles: styles.green,
        image: (
          <Image
            src={isDark ? '/assets/xbox.svg' : '/assets/xbox_dark.svg'}
            alt={ShellText.footer.socials.xbox}
            height={20}
            width={20}
          />
        ),
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
  }, [isDark, styles]);

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
