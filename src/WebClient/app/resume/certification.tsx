import { CertificateRegular } from '@fluentui/react-icons';

import ResumeItem from '@dotcom/resume/resume-item';
import { Certificate } from '@dotcom/types';

interface CertificationProps {
  certificate: Certificate;
}

export default function Certification({
  certificate,
}: Readonly<CertificationProps>) {
  return (
    <ResumeItem
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
}
