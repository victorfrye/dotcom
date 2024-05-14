import { Certification, Job, School } from '@dotcom/types';
import exp from 'constants';

interface IResumeData {
  jobs: Job[];
  schools: School[];
  certifications: Certification[];
  skills: string[];
}

const resumeData: IResumeData = {
  jobs: [
    {
      company: {
        name: 'Leading EDJE',
        location: 'Dublin, Ohio',
        description: 'software consultancy',
        url: 'https://leadingedje.com/',
      },
      title: 'Senior Software Engineer',
      startDate: new Date(2023, 2, 20),
      endDate: undefined,
      description:
        'Developing and architecting client solutions for a multitude of partners across industries. Key achievements include re-platforming a high-traffic lead generation widget for zero-downtime deployments and launching a mobile-native application healthcare application.',
    },
    {
      company: {
        name: 'Corewell Health',
        location: 'Grand Rapids, Michigan',
        description: 'regional healthcare provider',
        url: 'https://corewellhealth.org/',
      },
      title: 'Software Engineer',
      startDate: new Date(2019, 5, 6),
      endDate: new Date(2023, 2, 17),
      description:
        'Developed and supported continued operations of over 300 internal APIs and digital services to improve patient care and reduce member costs. Key achievements included the launch of a targeted marketing campaign service to push millions of personalized messages monthly and migration of legacy document service to a cloud-based solution for over 50% cost reduction.',
    },
  ],
  schools: [
    {
      name: 'Cornerstone University',
      degree: 'Master of Business Administration',
      major: 'Business Administration',
      location: 'Grand Rapids, Michigan',
      grade: '3.84',
      startDate: new Date(2020, 6, 1),
      graduationDate: new Date(2022, 2, 14),
      description:
        "Attended Cornerstone University's Professional & Graduate Studies program full-time in accelerated format. Academic focus was on quantitative business administration with an emphasis project management. Graduated with a 3.84 GPA.",
      url: 'https://cornerstone.edu/',
    },
    {
      name: 'Davenport University',
      degree: 'Bachelor of Science',
      major: 'Computer Science',
      location: 'Grand Rapids, Michigan',
      grade: '3.77',
      startDate: new Date(2016, 1, 3),
      graduationDate: new Date(2019, 12, 14),
      description:
        "Attended Davenport University's College of Technology full-time. Majored in computer science with focuses on software development, artificial intelligence, and mathematics. Graduated with a 3.77 GPA and three academic honor society inductions.",
      url: 'https://davenport.edu/',
    },
  ],
  certifications: [
    {
      name: 'Microsoft Certified: Azure Fundamentals',
      issuer: 'Microsoft',
      issueDate: new Date(2023, 12, 21),
      expirationDate: undefined,
      url: 'https://learn.microsoft.com/en-us/users/victorfrye/credentials/fab0ead497381392',
    },
    {
      name: 'Microsoft Certified: Azure AI Fundamentals',
      issuer: 'Microsoft',
      issueDate: new Date(2024, 4, 30),
      expirationDate: undefined,
      url: 'https://learn.microsoft.com/en-us/users/victorfrye/credentials/af866c0af923042d',
    },
  ],
  skills: [
    'C#',
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'PowerShell',
    'SQL',
    '.NET',
    'Node.js',
    'React.js',
    'Next.js',
    'Azure',
    'GitHub',
    'Terraform',
    'Docker',
    'Git',
  ],
};

export default resumeData;
