'use client';

import {
  Button,
  Caption1,
  CardFooter,
  Divider,
  Link,
  makeStyles,
  Tooltip,
  tokens,
} from '@fluentui/react-components';
import { WeatherMoonFilled, WeatherSunnyFilled } from '@fluentui/react-icons';
import { useCallback } from 'react';

import FooterButtons from '@/shell/socials';
import ShellText from '@/shell/text';
import { useColorMode } from '@/theme';

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
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: tokens.spacingVerticalM,
    '@media screen and (max-width: 576px)': {
      gap: tokens.spacingVerticalXXS,
    },
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
  icon: {
    color: tokens.colorNeutralForeground1,
  },
  toggle: {
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground4Hover,
    },
    ':hover:active': {
      backgroundColor: tokens.colorNeutralBackground4Pressed,
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
      gap: tokens.spacingVerticalMNudge,
      marginRight: 'auto',
      padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalL} ${tokens.spacingVerticalNone}`,
    },
    flexWrap: 'wrap',
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalL}`,
  },
  copyright: {
    color: tokens.colorNeutralForeground2,
  },
});

export default function Footer() {
  const styles = useStyles();
  const today: Date = new Date();

  const { colorMode, isDark, onColorModeToggle } = useColorMode();

  const handleColorModeClick = useCallback(() => {
    onColorModeToggle();
  }, [onColorModeToggle]);

  return (
    <>
      <Divider appearance="subtle" inset className={styles.divider} />

      <CardFooter className={styles.footer}>
        <div className={styles.container}>
          <FooterButtons />
          <Tooltip
            withArrow
            content={ShellText.footer.toggleColor(
              colorMode === 'light' ? 'dark' : 'light',
            )}
            relationship="label"
          >
            <Button
              className={styles.toggle}
              icon={
                isDark ? (
                  <WeatherSunnyFilled className={styles.icon} />
                ) : (
                  <WeatherMoonFilled className={styles.icon} />
                )
              }
              as="button"
              appearance="subtle"
              shape="circular"
              size="large"
              onClick={handleColorModeClick}
            />
          </Tooltip>
        </div>

        <div className={styles.legal}>
          <Link href={'/privacy'} appearance="subtle">
            <Caption1 as="span" align="end" block>
              {ShellText.footer.privacy}
            </Caption1>
          </Link>

          <Caption1 as="span" align="end" block className={styles.copyright}>
            {ShellText.footer.copyright(today.getFullYear())}
          </Caption1>
        </div>
      </CardFooter>
    </>
  );
}
