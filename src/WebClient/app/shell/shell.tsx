'use client';

import {
  Card,
  Link,
  makeStyles,
  type SelectTabEventHandler,
  Tab,
  TabList,
  type TabValue,
  tokens,
} from '@fluentui/react-components';
import {
  BriefcaseColor,
  BriefcaseRegular,
  bundleIcon,
  EditColor,
  EditRegular,
  PersonColor,
  PersonRegular,
} from '@fluentui/react-icons';
import { usePathname } from 'next/navigation';
import { type ReactNode, useCallback, useRef, useState } from 'react';

import Loading from '@/loading';
import { CookieBanner } from '@/privacy';
import Footer from '@/shell/footer';
import Header from '@/shell/header';
import ShellText from '@/shell/text';

const useStyles = makeStyles({
  shell: {
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalL}`,
    marginBottom: 'auto',
  },
  tabs: {
    margin: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalNone} ${tokens.spacingHorizontalMNudge}`,
  },
  main: {
    padding: tokens.spacingVerticalS,
    gap: tokens.spacingVerticalS,
  },
  link: {
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'none',
    },
    ':focus': {
      textDecoration: 'none',
    },
    ':active': {
      textDecoration: 'none',
    },
  },
});

interface ShellProps {
  children: ReactNode;
}

type TabOptions = 'about' | 'resume' | 'blog' | '';

const PersonIcon = bundleIcon(PersonColor, PersonRegular);
const BriefcaseIcon = bundleIcon(BriefcaseColor, BriefcaseRegular);
const EditIcon = bundleIcon(EditColor, EditRegular);

export default function Shell({ children }: ShellProps) {
  const styles = useStyles();

  const pathname = usePathname();

  const isHomePage = pathname === '/';
  const isBlogPage = pathname.startsWith('/blog');
  const isResumePage = pathname.startsWith('/resume');

  const homeLinkRef = useRef<HTMLAnchorElement>(null);
  const resumeLinkRef = useRef<HTMLAnchorElement>(null);
  const blogLinkRef = useRef<HTMLAnchorElement>(null);

  const getSelectedTab = useCallback((): TabOptions => {
    if (isHomePage) {
      return 'about';
    }

    if (isBlogPage) {
      return 'blog';
    }

    if (isResumePage) {
      return 'resume';
    }

    return '';
  }, [isHomePage, isBlogPage, isResumePage]);

  const currentPage = getSelectedTab();

  const [selectedValue, setSelectedValue] = useState<TabValue>(currentPage);

  const handleTabSelection: SelectTabEventHandler = (_event, data) => {
    switch (data.value) {
      case 'about':
        homeLinkRef.current?.click();
        break;
      case 'resume':
        resumeLinkRef.current?.click();
        break;
      case 'blog':
        blogLinkRef.current?.click();
        break;
      default:
        console.error(`Unknown tab value: ${data.value}`);
    }

    setSelectedValue(data.value);
  };

  return (
    <div className={styles.shell}>
      <Card className={styles.card}>
        <Header />
        <div className={styles.container}>
          <TabList
            selectedValue={getSelectedTab()}
            onTabSelect={handleTabSelection}
            appearance="transparent"
            size="large"
            className={styles.tabs}
          >
            <Tab id="About" icon={<PersonIcon />} value="about">
              <Link
                href={'/'}
                ref={homeLinkRef}
                appearance="subtle"
                className={styles.link}
              >
                {ShellText.navigation.about}
              </Link>
            </Tab>

            <Tab id="Resume" icon={<BriefcaseIcon />} value="resume">
              <Link
                href={'/resume'}
                ref={resumeLinkRef}
                appearance="subtle"
                className={styles.link}
              >
                {ShellText.navigation.resume}
              </Link>
            </Tab>

            <Tab id="Blog" icon={<EditIcon />} value="blog">
              <Link
                href={'/blog'}
                ref={blogLinkRef}
                appearance="subtle"
                className={styles.link}
              >
                {ShellText.navigation.blog}
              </Link>
            </Tab>
          </TabList>

          <main className={styles.main}>
            {selectedValue === currentPage ? children : <Loading />}
          </main>
        </div>
        <Footer />
      </Card>

      <CookieBanner />
    </div>
  );
}
