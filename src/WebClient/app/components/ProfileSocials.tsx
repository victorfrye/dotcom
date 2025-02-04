import { JSX, useCallback } from 'react';

import { Button, Image, makeStyles, tokens } from '@fluentui/react-components';

import useDarkMode from '@dotcom/hooks/useDarkMode';

interface ISocial {
  href: string;
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
});

const ProfileSocials = () => {
  const styles = useStyles();
  const { isDark } = useDarkMode();

  const getSocials = useCallback((): ISocial[] => {
    return [
      {
        href: 'https://threads.net/@thevictorfryeadventure',
        image: (
          <Image
            src={isDark ? '/images/threads.svg' : '/images/threads_dark.svg'}
            alt="Threads"
            height={20}
            width={20}
          />
        ),
      },
      {
        href: 'https://linkedin.com/in/victorfrye',
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
        image: (
          <Image
            src={isDark ? '/images/github.svg' : '/images/github_dark.svg'}
            alt="GitHub"
            height={20}
            width={20}
          />
        ),
      },
      {
        href: 'mailto:victorfrye@outlook.com',
        image: (
          <Image
            src={isDark ? '/images/envelope.svg' : '/images/envelope_dark.svg'}
            alt="Email Me"
            height={20}
            width={20}
          />
        ),
      },
    ];
  }, [isDark]);

  const renderButtons = (): JSX.Element[] => {
    return getSocials().map((social, index) => (
      <Button
        icon={social.image}
        as="a"
        appearance="subtle"
        shape="circular"
        size="large"
        href={social.href}
        target="_blank"
        rel="noreferrer noopener"
        key={index}
      />
    ));
  };

  return <div className={styles.container}>{renderButtons()}</div>;
};

export default ProfileSocials;
