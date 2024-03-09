'use client';

import { Company, Job, School } from "@dotcom/types";
import { About, Resume } from "@dotcom/components/home";
import { Divider, SelectTabData, SelectTabEvent, Tab, TabList, TabValue, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { Briefcase32Filled, Briefcase32Regular, Person32Filled, Person32Regular, bundleIcon } from "@fluentui/react-icons";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(tokens.spacingVerticalNone, tokens.spacingHorizontalL),
  },
  tabList: {
    ...shorthands.margin(tokens.spacingVerticalSNudge, tokens.spacingHorizontalNone, tokens.spacingHorizontalMNudge),
  },
  divider: {
    ...shorthands.margin(tokens.spacingVerticalXXL, tokens.spacingHorizontalNone),
  }
});

interface ICompany {
  name: string;
  description: string;
  location: string;
  url: string;
}

interface IJob {
  company: ICompany;
  title: string;
  startDate: string;
  endDate: string | undefined;
  description: string;
}

interface ISchool {
  name: string;
  degree: string;
  major: string;
  location: string;
  grade: string | undefined;
  startDate: string;
  graduationDate: string | undefined;
  description: string;
  url: string;
}

interface IResumeData {
  jobs: IJob[];
  schools: ISchool[];
  skills: string[];
}

const Home = () => {
  const styles = useStyles();

  const PersonIcon = bundleIcon(Person32Filled, Person32Regular);
  const BriefcaseIcon = bundleIcon(Briefcase32Filled, Briefcase32Regular);

  const [selectedValue, setSelectedValue] = useState<TabValue>('about');

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  const [jobs, setJobs] = useState<Job[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    const response = await fetch('./data/resume.json');
    const data: IResumeData = await response.json();

    setJobs(
      data.jobs?.map(
        (job: IJob) => {
          return new Job(
            new Company(
              job.company.name,
              job.company.location,
              job.company.description,
              job.company.url
            ),
            job.title,
            new Date(job.startDate),
            job.endDate ? new Date(job.endDate) : undefined,
            job.description,
          )
        }
      )
    );
    setSchools(
      data.schools?.map(
        (school: ISchool) => {
          return new School(
            school.name,
            school.degree,
            school.major,
            school.location,
            school.grade,
            new Date(school.startDate),
            school.graduationDate ? new Date(school.graduationDate) : undefined,
            school.description,
            school.url
          )
        }
      ),
    );
    setSkills(data.skills);
  }

  return (
    <main className={styles.main}>
      <TabList selectedValue={selectedValue} onTabSelect={onTabSelect} selectTabOnFocus appearance='transparent' size='large' className={styles.tabList}>
        <Tab id="About" icon={<PersonIcon />} value="about">
          About
        </Tab>
        <Tab id="Resume" icon={<BriefcaseIcon />} value="resume" >
          Resume
        </Tab>
      </TabList>
      
      <div>
        {selectedValue === 'about' && jobs && <About currentJob={jobs[0]} />}
        {selectedValue === 'resume' && jobs && <Resume jobs={jobs} schools={schools} skills={skills} />}
      </div>

      <Divider appearance='subtle' inset className={styles.divider} />
    </main>
  );
}

export default Home;
