'use client';

import {
  Avatar,
  CardHeader,
  Subtitle2,
  Title1,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  header: {
    alignItems: 'center',
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXXL} ${tokens.spacingVerticalNone}`,
  },
  title: {
    margin: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalSNudge}`,
  },
  tagline: {
    color: tokens.colorBrandForeground2,
    margin: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalSNudge}`,
  },
});

const Header = () => {
  const styles = useStyles();

  return (
    <CardHeader
      className={styles.header}
      image={
        <Avatar
          image={{
            src: '/images/profile.png',
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
        <Title1 as="h1" wrap={false} className={styles.title}>
          Victor Frye
        </Title1>
      }
      description={
        <Subtitle2 as="em" className={styles.tagline}>
          Your friendly neighborhood developer
        </Subtitle2>
      }
    />
  );
};

export default Header;
