import { FC } from 'react';

import { CertificateRegular } from '@fluentui/react-icons';

import ResumeCard from '@dotcom/components/resume/ResumeCard';
import { Certificate } from '@dotcom/types';

interface CertificationProps {
  certificate: Certificate;
}

const Certification: FC<CertificationProps> = ({ certificate }) => (
  <ResumeCard
    headerIcon={<CertificateRegular />}
    headerTitle={certificate.name}
    headerSubtitle={
      'Issued ' +
      certificate.issueDate.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      })
    }
    actionUrl={certificate.url}
  />
);

export default Certification;
