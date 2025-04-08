import { FC, useCallback } from 'react';

import { Body1 } from '@fluentui/react-components';
import { HatGraduationRegular } from '@fluentui/react-icons';

import ResumeCard from '@dotcom/components/resume/ResumeCard';
import { School } from '@dotcom/types';

interface EducationProps {
  school: School;
}

const getSchoolDescription = (school: School): JSX.Element => (
  <>
    <Body1>
      {school.startDate.getFullYear()} -{' '}
      {school.graduationDate ? school.graduationDate.getFullYear() : 'Present'}
    </Body1>
    <Body1 as="p">{school.description}</Body1>
  </>
);

const Education: FC<EducationProps> = ({ school }) => (
  <ResumeCard
    headerIcon={<HatGraduationRegular />}
    headerTitle={school.name}
    headerSubtitle={school.degree}
    content={getSchoolDescription(school)}
    actionUrl={school.url}
  />
);

export default Education;
