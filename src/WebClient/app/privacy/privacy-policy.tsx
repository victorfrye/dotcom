'use client';

import {
  makeStaticStyles,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
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
    // marginBlock: tokens.spacingVerticalM,
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
});

interface PrivacyPolicyProps {
  html: string;
}

export default function PrivacyPolicy({ html }: Readonly<PrivacyPolicyProps>) {
  const styles = useStyles();
  useMarkdownStyles();

  return (
    <main
      className={styles.container}
      dangerouslySetInnerHTML={{ __html: html ?? '' }}
    />
  );
}
