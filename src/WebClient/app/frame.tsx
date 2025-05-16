'use client';

import { ReactNode } from 'react';

import { Card, makeStyles, tokens } from '@fluentui/react-components';

import Footer from '@dotcom/footer';
import Header from '@dotcom/header';

const useStyles = makeStyles({
  frame: {
    display: 'flex',
    minHeight: 'calc(100vh - (var(--spacingVerticalXXXL) * 2))',
    '@media screen and (max-width: 576px)': {
      minHeight: '100vh',
      padding: tokens.spacingVerticalNone,
    },
    padding: tokens.spacingVerticalXXXL,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxShadow: tokens.shadow64,
    padding: tokens.spacingVerticalL,
  },
});

interface FrameProps {
  children: ReactNode;
}

export default function Frame({ children }: Readonly<FrameProps>) {
  const styles = useStyles();

  return (
    <div className={styles.frame}>
      <Card className={styles.card}>
        <Header />
        {children}
        <Footer />
      </Card>
    </div>
  );
}
