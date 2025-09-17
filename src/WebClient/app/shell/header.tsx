'use client';

import {
  Avatar,
  CardHeader,
  Subtitle2,
  Title1,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

import ShellText from '@dotcom/shell/text';

const useStyles = makeStyles({
  header: {
    alignItems: 'center',
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXXL} ${tokens.spacingVerticalNone}`,
  },
  title: {
    margin: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalSNudge}`,
  },
  tagline: {
    color: tokens.colorNeutralForeground2,
    margin: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalSNudge}`,
  },
});

export default function Header() {
  const styles = useStyles();

  return (
    <CardHeader
      className={styles.header}
      image={
        <Avatar
          image={{
            src: '/assets/profile.png',
            alt: 'a profile picture of Victor Frye',
          }}
          color="brand"
          name="Victor Frye"
          active="active"
          activeAppearance="ring-shadow"
          size={72}
        />
      }
      header={
        <Title1 as="span" wrap={false} className={styles.title}>
          {ShellText.header.title}
        </Title1>
      }
      description={
        <Subtitle2 as="em" className={styles.tagline}>
          {ShellText.header.tagline}
        </Subtitle2>
      }
    />
  );
}
