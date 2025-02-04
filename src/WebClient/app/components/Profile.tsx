import { useState } from 'react';

import {
  Avatar,
  Caption1,
  Card,
  CardFooter,
  CardHeader,
  Divider,
  SelectTabData,
  SelectTabEvent,
  Subtitle2,
  Switch,
  SwitchOnChangeData,
  Tab,
  TabList,
  TabValue,
  Title1,
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

import ProfileAbout from '@dotcom/components/ProfileAbout';
import ProfileResume from '@dotcom/components/ProfileResume';
import ProfileSocials from '@dotcom/components/ProfileSocials';
import resumeData from '@dotcom/data/resume';
import useDarkMode from '@dotcom/hooks/useDarkMode';
import { Certification, Job, School } from '@dotcom/types';

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
  profileCard: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxShadow: tokens.shadow64,
    padding: tokens.spacingVerticalL,
  },
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
  footer: {
    display: 'flex',
    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
    },
    justifyItems: 'center',
    marginTop: 'auto',
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalXL} ${tokens.spacingVerticalXL}`,
  },
  switch: {
    marginTop: 'auto',
    marginBottom: 'auto',
    '@media screen and (max-width: 576px)': {
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalL} ${tokens.spacingVerticalNone}`,
    },
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalM}`,
  },
  copyright: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    '@media screen and (max-width: 576px)': {
      marginRight: 'auto',
      padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalL} ${tokens.spacingVerticalNone}`,
    },
    flexWrap: 'wrap',
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalL}`,
  },
});

const PersonIcon = bundleIcon(PersonFilled, PersonRegular);
const BriefcaseIcon = bundleIcon(BriefcaseFilled, BriefcaseRegular);

const Profile = () => {
  const styles = useStyles();
  const { isDark, onDarkModeToggled } = useDarkMode();

  const [selectedValue, setSelectedValue] = useState<TabValue>('about');

  const onTabSelect = (_event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const [jobs] = useState<Job[]>(resumeData.jobs);
  const [schools] = useState<School[]>(resumeData.schools);
  const [certifications] = useState<Certification[]>(resumeData.certifications);
  const [skills] = useState<string[]>(resumeData.skills);

  const handleDarkModeToggled = (
    _event: React.ChangeEvent<HTMLInputElement>,
    data: SwitchOnChangeData
  ) => {
    onDarkModeToggled(data.checked);
  };

  return (
    <div className={styles.frame}>
      <Card className={styles.profileCard}>
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
            {selectedValue === 'about' && jobs && (
              <ProfileAbout
                currentJob={jobs[0]}
                firstJob={jobs[jobs.length - 1]}
              />
            )}
            {selectedValue === 'resume' && jobs && (
              <ProfileResume
                jobs={jobs}
                schools={schools}
                certifications={certifications}
                skills={skills}
              />
            )}
          </div>

          <Divider appearance="subtle" inset className={styles.divider} />
        </main>

        <CardFooter className={styles.footer}>
          <ProfileSocials />
          <Switch
            checked={isDark}
            onChange={handleDarkModeToggled}
            label={isDark ? 'Dark Mode' : 'Light Mode'}
            className={styles.switch}
          />

          <Caption1 as="p" align="end" block className={styles.copyright}>
            © Victor Frye {new Date().getFullYear()}
          </Caption1>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
