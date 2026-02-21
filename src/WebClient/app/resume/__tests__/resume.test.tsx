import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../test-utils';
import Resume from '../resume';

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
    ],
    certifications: [
      {
        name: 'Azure Developer Associate',
        issuer: { name: 'Microsoft' },
        startDate: new Date('2021-06-01'),
      },
    ],
    skills: [
      { name: 'TypeScript', category: 'Languages' },
      { name: 'React', category: 'Frameworks' },
    ],
    portfolio: [
      {
        name: 'Test Project',
        description: 'A test project',
        startDate: new Date('2022-01-01'),
        link: 'https://example.com',
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
});
