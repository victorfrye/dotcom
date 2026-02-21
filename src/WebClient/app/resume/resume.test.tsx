import { renderWithProviders } from '@test-utils';
import { screen } from '@testing-library/react';
import Resume from './resume';

jest.mock('@/resume/use-resume', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    experience: [
      {
        company: { name: 'Test Corp', location: 'Remote' },
        title: 'Software Engineer',
        startDate: new Date('2020-01-01'),
        endDate: undefined,
        accomplishments: ['Built features'],
      },
      {
        company: { name: 'Old Corp', location: 'Remote' },
        title: 'Junior Developer',
        startDate: new Date('2018-01-01'),
        endDate: new Date('2019-12-01'),
        accomplishments: ['Learned things'],
      },
      {
        company: { name: 'Mid Corp', location: 'Remote' },
        title: 'Developer',
        startDate: new Date('2019-06-01'),
        endDate: new Date('2020-06-01'),
        accomplishments: ['Grew skills'],
      },
    ],
    education: [
      {
        school: { name: 'Test University' },
        degree: 'B.S. Computer Science',
        major: 'Computer Science',
        startDate: new Date('2016-08-01'),
        endDate: new Date('2020-05-01'),
        accomplishments: [],
      },
      {
        school: { name: 'Current University' },
        degree: 'M.S. Computer Science',
        major: 'Computer Science',
        startDate: new Date('2023-08-01'),
        endDate: undefined,
        accomplishments: [],
      },
      {
        school: { name: 'Bootcamp' },
        degree: 'Certificate',
        major: 'Web Dev',
        startDate: new Date('2015-01-01'),
        endDate: new Date('2016-06-01'),
        accomplishments: [],
      },
    ],
    certifications: [
      {
        name: 'Azure Developer Associate',
        issuer: { name: 'Microsoft' },
        startDate: new Date('2021-06-01'),
      },
      {
        name: 'AWS Solutions Architect',
        issuer: { name: 'Amazon' },
        startDate: new Date('2022-03-01'),
      },
      {
        name: 'Google Cloud Engineer',
        issuer: { name: 'Google' },
        startDate: new Date('2020-01-01'),
      },
    ],
    skills: [
      { name: 'TypeScript', category: 'Languages' },
      { name: 'React', category: 'Frameworks' },
      { name: 'Misc Skill', category: '' },
    ],
    portfolio: [
      {
        name: 'Test Project',
        description: 'A test project',
        startDate: new Date('2022-01-01'),
        link: 'https://example.com',
      },
      {
        name: 'Older Project',
        description: 'An older project',
        startDate: new Date('2021-01-01'),
        link: 'https://example2.com',
      },
      {
        name: 'Newest Project',
        description: 'A new project',
        startDate: new Date('2023-01-01'),
        link: undefined,
      },
    ],
  }),
}));

describe('Resume', () => {
  it('renders experience section', () => {
    renderWithProviders(<Resume />);
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(
      screen.getByText('Software Engineer | Test Corp'),
    ).toBeInTheDocument();
  });

  it('renders education section', () => {
    renderWithProviders(<Resume />);
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(
      screen.getByText('B.S. Computer Science | Test University'),
    ).toBeInTheDocument();
  });

  it('renders certifications section', () => {
    renderWithProviders(<Resume />);
    expect(screen.getByText('Certifications')).toBeInTheDocument();
    expect(screen.getByText('Azure Developer Associate')).toBeInTheDocument();
  });

  it('renders skills section', () => {
    renderWithProviders(<Resume />);
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders portfolio section', () => {
    renderWithProviders(<Resume />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('sorts experience by end date descending (present jobs first)', () => {
    renderWithProviders(<Resume />);
    const experienceSection = screen.getByText('Experience').closest('section');
    const titles = experienceSection?.querySelectorAll('h3');
    expect(titles?.[0]).toHaveTextContent('Software Engineer | Test Corp');
    expect(titles?.[1]).toHaveTextContent('Developer | Mid Corp');
    expect(titles?.[2]).toHaveTextContent('Junior Developer | Old Corp');
  });

  it('sorts education by end date descending (current enrollment first)', () => {
    renderWithProviders(<Resume />);
    const educationSection = screen.getByText('Education').closest('section');
    const titles = educationSection?.querySelectorAll('h3');
    expect(titles?.[0]).toHaveTextContent(
      'M.S. Computer Science | Current University',
    );
    expect(titles?.[1]).toHaveTextContent(
      'B.S. Computer Science | Test University',
    );
    expect(titles?.[2]).toHaveTextContent('Certificate | Bootcamp');
  });

  it('displays Currently enrolled for education without end date', () => {
    renderWithProviders(<Resume />);
    expect(screen.getByText('Currently enrolled')).toBeInTheDocument();
  });

  it('displays Graduated for education with end date', () => {
    renderWithProviders(<Resume />);
    expect(screen.getAllByText(/Graduated/).length).toBeGreaterThan(0);
  });

  it('sorts certifications by start date descending (newest first)', () => {
    renderWithProviders(<Resume />);
    const certSection = screen.getByText('Certifications').closest('section');
    const titles = certSection?.querySelectorAll('h3');
    expect(titles?.[0]).toHaveTextContent('AWS Solutions Architect');
    expect(titles?.[1]).toHaveTextContent('Azure Developer Associate');
    expect(titles?.[2]).toHaveTextContent('Google Cloud Engineer');
  });

  it('sorts portfolio by start date ascending (oldest first)', () => {
    renderWithProviders(<Resume />);
    const portfolioSection = screen.getByText('Portfolio').closest('section');
    const titles = portfolioSection?.querySelectorAll('h3');
    expect(titles?.[0]).toHaveTextContent('Older Project');
    expect(titles?.[1]).toHaveTextContent('Test Project');
    expect(titles?.[2]).toHaveTextContent('Newest Project');
  });
});
