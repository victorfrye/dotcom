'use client';

import { ReactNode, useCallback } from 'react';

import {
  Card,
  NavDrawer,
  NavDrawerBody,
  NavItem,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  BriefcaseColor,
  BriefcaseRegular,
  EditColor,
  EditRegular,
  PersonColor,
  PersonRegular,
  bundleIcon,
} from '@fluentui/react-icons';
import { usePathname } from 'next/navigation';

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
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    marginBottom: 'auto',
    width: '100%',
  },
  nav: {
    minWidth: '10vw',
    width: '25vw',
    margin: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalXXL} auto ${tokens.spacingHorizontalNone}`,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalMNudge}`,
    borderRadius: tokens.borderRadiusXLarge,
    '@media screen and (max-width: 576px)': {
      minWidth: 0,
      width: 0,
      display: 'none',
    },
  },
  navBody: {
    marginBottom: 'auto',
  },
  content: {
    '@media screen and (max-width: 576px)': {
      width: '85vw',
    },
  },
});

interface FrameProps {
  children: ReactNode;
}

const PersonIcon = bundleIcon(PersonColor, PersonRegular);
const BriefcaseIcon = bundleIcon(BriefcaseColor, BriefcaseRegular);
const EditIcon = bundleIcon(EditColor, EditRegular);

export default function Frame({ children }: Readonly<FrameProps>) {
  const styles = useStyles();
  const pathname = usePathname();

  const isBlogPage = pathname.startsWith('/blog');
  const isResumePage = pathname.startsWith('/resume');

  const getSelectedNavItem = useCallback((): string => {
    if (isBlogPage) {
      return 'blog';
    }

    if (isResumePage) {
      return 'resume';
    }

    return 'about';
  }, [isBlogPage, isResumePage]);

  return (
    <div className={styles.frame}>
      <Card className={styles.card}>
        <Header />
        <div className={styles.root}>
          <NavDrawer
            selectedValue={getSelectedNavItem()}
            open
            type="inline"
            className={styles.nav}
            size="full"
          >
            <NavDrawerBody className={styles.navBody}>
              <NavItem href="/" value="about" icon={<PersonIcon />}>
                About
              </NavItem>
              <NavItem href="/resume" value="resume" icon={<BriefcaseIcon />}>
                Resume
              </NavItem>
              <NavItem href="/blog" value="blog" icon={<EditIcon />}>
                Blog
              </NavItem>
            </NavDrawerBody>
          </NavDrawer>
          <div className={styles.content}>
            {children}
            </div>
        </div>
        <Footer />
      </Card>
    </div>
  );
}
