'use client';

import { useMemo } from 'react';

import {
  Text,
  Title1,
  makeStaticStyles,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

import PrivacyText from '@dotcom/privacy/text';

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

const useMarkdownStyles = makeStaticStyles({
  ul: {
    margin: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalNone}`,
  },
  li: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  a: {
    color: tokens.colorBrandForegroundLink,
    textDecorationLine: 'none',
  },
  'a:hover': {
    color: tokens.colorBrandForegroundLinkHover,
    textDecorationLine: 'underline',
  },
  'a:active': {
    color: tokens.colorBrandForegroundLinkPressed,
    textDecorationLine: 'underline',
  },
  p: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    margin: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalNone}`,
  },
  h1: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightHero800,
  },
  h2: {
    fontSize: tokens.fontSizeHero700,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightHero700,
  },
  h3: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase600,
  },
  table: {
    borderCollapse: 'collapse',
    gap: tokens.spacingVerticalM,
  },
  tr: {
    borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  th: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    fontWeight: tokens.fontWeightSemibold,
  },
  td: {
    height: tokens.spacingVerticalXXXL,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
  },
});

interface PolicyProps {
  content: string;
  date: Date;
}

export default function Policy({ content, date }: Readonly<PolicyProps>) {
  const styles = useStyles();
  useMarkdownStyles();

  const formattedDate = useMemo(() => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, [date]);

  return (
    <main className={styles.container}>
      <Title1 as="h1" className={styles.title}>
        {PrivacyText.policy.title}
      </Title1>

      <Text italic>{`${PrivacyText.policy.lastUpdated} ${formattedDate}`}</Text>

      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className={styles.container}
      />
    </main>
  );
}
