import { FC } from 'react';

import { Body1 } from '@fluentui/react-components';
import { BuildingRegular } from '@fluentui/react-icons';

import ResumeCard from '@dotcom/lib/resume/ResumeCard';
import { Job } from '@dotcom/types';

interface WorkplaceProps {
  job: Job;
}

const getJobDescription = (job: Job): JSX.Element => (
  <>
    <Body1 as="p">
      {job.startDate.getFullYear()} -{' '}
      {job.endDate ? job.endDate.getFullYear() : 'Present'}
    </Body1>
    <Body1 as="p">{job.description}</Body1>
  </>
);

const Workplace: FC<WorkplaceProps> = ({ job }) => (
  <ResumeCard
    headerIcon={<BuildingRegular />}
    headerTitle={job.company.name}
    headerSubtitle={job.title}
    content={getJobDescription(job)}
    actionUrl={job.company.url}
  />
);

export default Workplace;
