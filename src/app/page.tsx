'use client';

import About from "@dotcom/components/home/about";
import { Divider, makeStyles, shorthands, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(tokens.spacingVerticalNone, tokens.spacingHorizontalL),
  },
  divider: {
    ...shorthands.margin(tokens.spacingVerticalXXL, tokens.spacingHorizontalNone),
  }
});

export default function Home() {
  const styles = useStyles();

  return (
    <main className={styles.main}>
      <About />

      <Divider appearance='subtle' inset className={styles.divider} />
    </main>
  );
}
