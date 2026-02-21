'use client';

import { makeStyles, Text, Title1, tokens } from '@fluentui/react-components';
import type { ReactNode } from 'react';

import PrivacyText from '@/privacy/text';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  title: {
    display: 'flex',
    margin: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalM}`,
  },
});

interface PolicyProps {
  date: string;
  children: ReactNode;
}

export default function Policy({ date, children }: Readonly<PolicyProps>) {
  const styles = useStyles();

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <main className={styles.container}>
      <Title1 as="h1" className={styles.title}>
        {PrivacyText.policy.title}
      </Title1>

      <Text italic>{`${PrivacyText.policy.lastUpdated} ${formattedDate}`}</Text>

      {children}
    </main>
  );
}
