'use client';

import { JSX, useCallback } from 'react';

import { Button, Image, makeStyles, tokens } from '@fluentui/react-components';
import { MailFilled } from '@fluentui/react-icons';

import { useDarkMode } from '@dotcom/theme';

interface Social {
  href: string;
  styles?: string;
  image: JSX.Element;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: tokens.spacingVerticalM,
    '@media screen and (max-width: 576px)': {
      gap: tokens.spacingVerticalSNudge,
    },
  },
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

export default function Socials() {
  const styles = useStyles();
  const { isDark } = useDarkMode();

  const getSocials = useCallback((): Social[] => {
    return [
      {
        href: 'https://www.linkedin.com/in/victorfrye',
        styles: styles.blue,
        image: (
          <Image
            src={isDark ? '/assets/linkedin.svg' : '/assets/linkedin_dark.svg'}
            alt="LinkedIn"
            height={20}
            width={20}
            suppressHydrationWarning
          />
        ),
      },
      {
        href: 'https://github.com/victorfrye',
        styles: styles.neutral,
        image: (
          <Image
            src={isDark ? '/assets/github.svg' : '/assets/github_dark.svg'}
            alt="GitHub"
            height={20}
            width={20}
            suppressHydrationWarning
          />
        ),
      },
      {
        href: 'https://www.threads.com/@thevictorfryeadventure',
        styles: styles.neutral,
        image: (
          <Image
            src={isDark ? '/assets/threads.svg' : '/assets/threads_dark.svg'}
            alt="Threads"
            height={20}
            width={20}
            suppressHydrationWarning
          />
        ),
      },
      {
        href: 'https://bsky.app/profile/victorfrye.com',
        styles: styles.blue,
        image: (
          <Image
            src={isDark ? '/assets/bluesky.svg' : '/assets/bluesky_dark.svg'}
            alt="Bluesky"
            height={20}
            width={20}
            suppressHydrationWarning
          />
        ),
      },
      {
        href: 'https://www.xbox.com/play/user/FrenchFrye6173',
        styles: styles.green,
        image: (
          <Image
            src={isDark ? '/assets/xbox.svg' : '/assets/xbox_dark.svg'}
            alt="Xbox"
            height={20}
            width={20}
          />
        ),
      },
      {
        href: 'mailto:victorfrye@outlook.com',
        styles: styles.brand,
        image: <MailFilled className={styles.icon} height={20} width={20} />,
      },
    ];
  }, [isDark, styles]);

  const renderButtons = (): JSX.Element[] => {
    return getSocials().map((social) => (
      <Button
        className={social.styles}
        icon={social.image}
        as="a"
        appearance="subtle"
        shape="circular"
        size="large"
        href={social.href}
        target="_blank"
        rel="me noreferrer noopener"
        key={social.href}
        suppressHydrationWarning
      />
    ));
  };

  return <div className={styles.container}>{renderButtons()}</div>;
}
