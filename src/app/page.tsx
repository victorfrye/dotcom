'use client';

import { Company, Job, School } from '@dotcom/types';
import { About, Resume } from '@dotcom/components/home';
import {
  Divider,
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList,
  TabValue,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import {
  Briefcase32Filled,
  Briefcase32Regular,
  Person32Filled,
  Person32Regular,
  bundleIcon,
} from '@fluentui/react-icons';
import { useState } from 'react';
import resumeData from '@dotcom/data/resume';

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(
      tokens.spacingVerticalNone,
      tokens.spacingHorizontalL,
    ),
  },
  tabList: {
    ...shorthands.margin(
      tokens.spacingVerticalSNudge,
      tokens.spacingHorizontalNone,
      tokens.spacingHorizontalMNudge,
    ),
  },
  divider: {
    ...shorthands.margin(
      tokens.spacingVerticalXXL,
      tokens.spacingHorizontalNone,
    ),
  },
});

const Home = () => {
  const styles = useStyles();

  const PersonIcon = bundleIcon(Person32Filled, Person32Regular);
  const BriefcaseIcon = bundleIcon(Briefcase32Filled, Briefcase32Regular);

  const [selectedValue, setSelectedValue] = useState<TabValue>('about');

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const [jobs] = useState<Job[]>(resumeData.jobs);
  const [schools] = useState<School[]>(resumeData.schools);
  const [skills] = useState<string[]>(resumeData.skills);

  return (
    <main className={styles.main}>
      <TabList
        selectedValue={selectedValue}
        onTabSelect={onTabSelect}
        selectTabOnFocus
        appearance='transparent'
        size='large'
        className={styles.tabList}
      >
        <Tab id='About' icon={<PersonIcon />} value='about'>
          About
        </Tab>
        <Tab id='Resume' icon={<BriefcaseIcon />} value='resume'>
          Resume
        </Tab>
      </TabList>

      <div>
        {selectedValue === 'about' && jobs && (
          <About currentJob={jobs[0]} firstJob={jobs[jobs.length - 1]} />
        )}
        {selectedValue === 'resume' && jobs && (
          <Resume jobs={jobs} schools={schools} skills={skills} />
        )}
      </div>

      <Divider appearance='subtle' inset className={styles.divider} />
    </main>
  );
};

export default Home;
