'use client';

import { useState } from 'react';

import {
  Divider,
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList,
  TabValue,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  BriefcaseFilled,
  BriefcaseRegular,
  PersonFilled,
  PersonRegular,
  bundleIcon,
} from '@fluentui/react-icons';

import About from '@dotcom/components/about/About';
import { Resume, useResume } from '@dotcom/components/resume';

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
  },
  tabList: {
    margin: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalNone} ${tokens.spacingHorizontalMNudge}`,
  },
  divider: {
    margin: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalNone}`,
  },
});

const PersonIcon = bundleIcon(PersonFilled, PersonRegular);
const BriefcaseIcon = bundleIcon(BriefcaseFilled, BriefcaseRegular);

const HomePage = () => {
  const styles = useStyles();

  const [selectedValue, setSelectedValue] = useState<TabValue>('about');

  const onTabSelect = (_event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

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
      </TabList>

      <div>
        {selectedValue === 'about' && jobs && <About />}
        {selectedValue === 'resume' && jobs && <Resume />}
      </div>

      <Divider appearance="subtle" inset className={styles.divider} />
    </main>
  );
};

export default HomePage;
