'use client';

import { ChangeEvent, useRef } from 'react';

import {
  Caption1,
  CardFooter,
  Divider,
  Link,
  Switch,
  SwitchOnChangeData,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

import Socials from '@dotcom/socials';
import { useDarkMode } from '@dotcom/theme';

const useStyles = makeStyles({
  footer: {
    display: 'flex',
    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
      rowGap: tokens.spacingVerticalS,
    },
    justifyItems: 'center',
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalXL} ${tokens.spacingVerticalXL}`,
  },
  divider: {
    flex: '0 1 auto',
    margin: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalXXL}`,
  },
  switch: {
    marginTop: 'auto',
    marginBottom: 'auto',
    '@media screen and (max-width: 576px)': {
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalL} ${tokens.spacingVerticalNone}`,
    },
  },
  privacy: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    '@media screen and (max-width: 576px)': {
      marginRight: 'auto',
      padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalL} ${tokens.spacingVerticalNone}`,
    },
    flexWrap: 'wrap',
  },
  copyright: {
    marginTop: 'auto',
    marginBottom: 'auto',
    '@media screen and (max-width: 576px)': {
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalL} ${tokens.spacingVerticalNone}`,
    },
    flexWrap: 'wrap',
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalL}`,
  },
});

export default function Footer() {
  const styles = useStyles();
  const _today: Date = new Date();

  const { isDark, onDarkModeToggled } = useDarkMode();

  const handleDarkModeToggled = (
    _event: ChangeEvent<HTMLInputElement>,
    data: SwitchOnChangeData
  ) => {
    onDarkModeToggled(data.checked);
  };

  const privacyLinkRef = useRef<HTMLAnchorElement>(null);

  return (
    <>
      <Divider appearance="subtle" inset className={styles.divider} />

      <CardFooter className={styles.footer}>
        <Socials />
        <Switch
          checked={isDark}
          onChange={handleDarkModeToggled}
          label={isDark ? 'Dark Mode' : 'Light Mode'}
          className={styles.switch}
        />

        <Link
          href={'/privacy'}
          ref={privacyLinkRef}
          appearance="subtle"
          className={styles.privacy}
        >
          <Caption1 as="span" align="end" block>
            Privacy
          </Caption1>
        </Link>

        <Caption1 as="span" align="end" block className={styles.copyright}>
          © Victor Frye {_today.getFullYear()}
        </Caption1>
      </CardFooter>
    </>
  );
}
