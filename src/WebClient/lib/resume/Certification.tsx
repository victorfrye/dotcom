import { CertificateRegular } from '@fluentui/react-icons';

import ResumeCard from '@dotcom/lib/resume/ResumeCard';
import { Certificate } from '@dotcom/types';

interface CertificationProps {
  certificate: Certificate;
}

export default function Certification({
  certificate,
}: Readonly<CertificationProps>) {
  return (
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
}
