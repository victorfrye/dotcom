'use client';

import { makeStyles, tokens } from '@fluentui/react-components';

import About from '@dotcom/about';

const useStyles = makeStyles({
  frame: {
    display: 'flex',
    minHeight: `calc(100vh - (${tokens.spacingVerticalXXXL} * 2))`,
    '@media screen and (max-width: 576px)': {
      minHeight: '100vh',
      padding: tokens.spacingVerticalNone,
    },
    padding: tokens.spacingVerticalXXXL,
  },
  profileCard: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxShadow: tokens.shadow64,
    padding: tokens.spacingVerticalL,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalL}}`,
    marginBottom: 'auto',
  },
  tabList: {
    margin: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalNone} ${tokens.spacingHorizontalMNudge}`,
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },
});

export default function HomePage() {
  const styles = useStyles();

  return (
    <main className={styles.main}>
      <About />
    </main>
  );
}
