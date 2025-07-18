'use client';

import { ChangeEvent } from 'react';

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
  legal: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    columnGap: tokens.spacingVerticalL,
    '@media screen and (max-width: 576px)': {
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

  const { isDark, onDarkModeToggle } = useDarkMode();

  const handleDarkModeToggle = (
    _event: ChangeEvent<HTMLInputElement>,
    data: SwitchOnChangeData
  ) => {
    onDarkModeToggle(data.checked);
  };

  return (
    <>
      <Divider appearance="subtle" inset className={styles.divider} />

      <CardFooter className={styles.footer}>
        <Socials />
        <Switch
          checked={isDark}
          onChange={handleDarkModeToggle}
          label={isDark ? 'Dark Mode' : 'Light Mode'}
          className={styles.switch}
        />

        <div className={styles.legal}>
          <Link href={'/privacy'} appearance="subtle">
            <Caption1 as="span" align="end" block>
              Privacy
            </Caption1>
          </Link>

          <Caption1 as="span" align="end" block>
            © Victor Frye {_today.getFullYear()}
          </Caption1>
        </div>
      </CardFooter>
    </>
  );
}
