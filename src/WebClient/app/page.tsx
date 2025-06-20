'use client';

import { useRef, useState } from 'react';

import {
  Link,
  SelectTabData,
  SelectTabEvent,
  Spinner,
  Tab,
  TabList,
  TabValue,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { BriefcaseColor, EditColor, PersonColor } from '@fluentui/react-icons';

import About from '@dotcom/about';
import { Resume, useResume } from '@dotcom/resume';

const useStyles = makeStyles({
  frame: {
    display: 'flex',
    minHeight: `calc(100vh - (${tokens.spacingVerticalXXXL} * 2))`,
    '@media screen and (max-width: 576px)': {
      minHeight: '100vh',
      padding: tokens.spacingVerticalNone,
    },
    padding: tokens.spacingVerticalXXXL,
  },
  profileCard: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxShadow: tokens.shadow64,
    padding: tokens.spacingVerticalL,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalL}}`,
    marginBottom: 'auto',
  },
  tabList: {
    margin: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalNone} ${tokens.spacingHorizontalMNudge}`,
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },
});

const PersonIcon = PersonColor;
const BriefcaseIcon = BriefcaseColor;
const EditIcon = EditColor;

export default function HomePage() {
  const styles = useStyles();

  const [selectedValue, setSelectedValue] = useState<TabValue>('about');

  const onTabSelect = (_event: SelectTabEvent, data: SelectTabData) => {
    if (data.value === 'blog') {
      blogLinkRef.current?.click();
    }

    setSelectedValue(data.value);
  };

  const blogLinkRef = useRef<HTMLAnchorElement>(null);

  const { jobs } = useResume();

  return (
    <main className={styles.main}>
      <TabList
        selectedValue={selectedValue}
        onTabSelect={onTabSelect}
        selectTabOnFocus
        appearance="transparent"
        size="large"
        className={styles.tabList}
      >
        <Tab id="About" icon={<PersonIcon />} value="about">
          About
        </Tab>
        <Tab id="Resume" icon={<BriefcaseIcon />} value="resume">
          Resume
        </Tab>
        <Tab id="Blog" icon={<EditIcon />} value="blog">
          <Link href={'/blog'} ref={blogLinkRef} appearance="subtle">
            Blog
          </Link>
        </Tab>
      </TabList>

      <div>
        {selectedValue === 'about' && jobs && <About />}
        {selectedValue === 'resume' && jobs && <Resume />}
        {selectedValue === 'blog' && (
          <Spinner
            label={'Loading...'}
            size="extra-large"
            className={styles.spinner}
          />
        )}
      </div>
    </main>
  );
}
