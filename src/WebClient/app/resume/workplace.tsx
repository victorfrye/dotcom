import { Body1 } from '@fluentui/react-components';
import { BuildingColor } from '@fluentui/react-icons';

import ResumeItem from '@dotcom/resume/resume-item';
import { Job } from '@dotcom/types';

interface WorkplaceProps {
  job: Job;
}

function getJobDescription(job: Job): JSX.Element {
  return (
    <>
      <Body1 as="p">
        {job.startDate.getFullYear()} -{' '}
        {job.endDate ? job.endDate.getFullYear() : 'Present'}
      </Body1>
      <Body1 as="p">{job.description}</Body1>
    </>
  );
}

export default function Workplace({ job }: Readonly<WorkplaceProps>) {
  return (
    <ResumeItem
      headerIcon={<BuildingColor />}
      headerTitle={job.company.name}
      headerSubtitle={job.title}
      content={getJobDescription(job)}
      actionUrl={job.company.url}
    />
  );
}
