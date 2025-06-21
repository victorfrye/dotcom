import { Body1 } from '@fluentui/react-components';
import { BookColor } from '@fluentui/react-icons';

import ResumeItem from '@dotcom/resume/resume-item';
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
    <ResumeItem
      headerIcon={<BookColor />}
      headerTitle={school.name}
      headerSubtitle={school.degree}
      content={getSchoolDescription(school)}
      actionUrl={school.url}
    />
  );
}
