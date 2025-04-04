import { JSX, useCallback } from 'react';

import { Button, Image, makeStyles, tokens } from '@fluentui/react-components';
import { MailFilled } from '@fluentui/react-icons';

import { useDarkMode } from '@dotcom/components/theme';

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
    gap: tokens.spacingVerticalSNudge,
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
  lavender: {
    ':hover': {
      backgroundColor: tokens.colorPaletteLavenderBackground2,
    },
    ':hover:active': {
      backgroundColor: tokens.colorPaletteLavenderBackground2,
    },
  },
});

const Socials = () => {
  const styles = useStyles();
  const { isDark } = useDarkMode();

  const getSocials = useCallback((): Social[] => {
    return [
      {
        href: 'https://www.linkedin.com/in/victorfrye',
        styles: styles.blue,
        image: (
          <Image
            src={isDark ? '/images/linkedin.svg' : '/images/linkedin_dark.svg'}
            alt="LinkedIn"
            height={20}
            width={20}
          />
        ),
      },
      {
        href: 'https://github.com/victorfrye',
        styles: styles.neutral,
        image: (
          <Image
            src={isDark ? '/images/github.svg' : '/images/github_dark.svg'}
            alt="GitHub"
            height={20}
            width={20}
          />
        ),
      },
      // {
      //   href: 'https://www.threads.net/@thevictorfryeadventure',
      //   styles: styles.neutral,
      //   image: (
      //     <Image
      //       src={isDark ? '/images/threads.svg' : '/images/threads_dark.svg'}
      //       alt="Threads"
      //       height={20}
      //       width={20}
      //     />
      //   ),
      // },
      {
        href: 'https://bsky.app/profile/victorfrye.com',
        styles: styles.blue,
        image: (
          <Image
            src={isDark ? '/images/bluesky.svg' : '/images/bluesky_dark.svg'}
            alt="Bluesky"
            height={20}
            width={20}
          />
        ),
      },
      {
        href: 'https://discord.com/users/914672291474997289',
        styles: styles.lavender,
        image: (
          <Image
            src={isDark ? '/images/discord.svg' : '/images/discord_dark.svg'}
            alt="Discord"
            height={20}
            width={20}
          />
        ),
      },
      {
        href: 'https://www.xbox.com/play/user/FrenchFrye6173',
        styles: styles.green,
        image: (
          <Image
            src={isDark ? '/images/xbox.svg' : '/images/xbox_dark.svg'}
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
      />
    ));
  };

  return <div className={styles.container}>{renderButtons()}</div>;
};

export default Socials;
