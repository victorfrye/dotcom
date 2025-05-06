import { Body1 } from '@fluentui/react-components';
import { HatGraduationRegular } from '@fluentui/react-icons';

import ResumeCard from '@dotcom/lib/resume/ResumeCard';
import { School } from '@dotcom/types';

interface EducationProps {
  school: School;
}

function getSchoolDescription(school: School): JSX.Element {
  return (
    <>
      <Body1>
        {school.startDate.getFullYear()} -{' '}
        {school.graduationDate
          ? school.graduationDate.getFullYear()
          : 'Present'}
      </Body1>
      <Body1 as="p">{school.description}</Body1>
    </>
  );
}

export default function Education({ school }: Readonly<EducationProps>) {
  return (
    <ResumeCard
      headerIcon={<HatGraduationRegular />}
      headerTitle={school.name}
      headerSubtitle={school.degree}
      content={getSchoolDescription(school)}
      actionUrl={school.url}
    />
  );
}
