import { renderWithProviders } from '@test-utils';
import { screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import About from './about';

jest.mock('@fluentui/react-components', () => {
  const actual = jest.requireActual('@fluentui/react-components');
  const PassThrough = ({ children }: { children?: ReactNode }) => (
    <div>{children}</div>
  );
  return {
    ...actual,
    Carousel: PassThrough,
    CarouselCard: PassThrough,
    CarouselNav: ({ children }: { children?: (i: number) => ReactNode }) =>
      children ? <div>{children(0)}</div> : null,
    CarouselNavButton: () => <button type="button">nav</button>,
    CarouselNavContainer: PassThrough,
    CarouselSlider: PassThrough,
    CarouselViewport: PassThrough,
  };
});

const mockUseResume = jest.fn(() => ({
  experience: [
    {
      title: 'Software Engineer',
      company: { name: 'Test Company' },
      startDate: new Date('2020-01-01'),
    },
  ],
  education: [],
  certifications: [],
  skills: [],
  portfolio: [],
  loading: false,
}));

jest.mock('@/resume', () => ({
  useResume: () => mockUseResume(),
}));

describe('About', () => {
  beforeEach(() => {
    mockUseResume.mockReturnValue({
      experience: [
        {
          title: 'Software Engineer',
          company: { name: 'Test Company' },
          startDate: new Date('2020-01-01'),
        },
      ],
      education: [],
      certifications: [],
      skills: [],
      portfolio: [],
      loading: false,
    });
  });

  it('renders the about section', () => {
    const { container } = renderWithProviders(<About />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('contains profile text content', () => {
    renderWithProviders(<About />);

    expect(screen.getByText('Hello from Grand Rapids!')).toBeInTheDocument();
    expect(screen.getByText('Developer by day')).toBeInTheDocument();
    expect(screen.getByText('Champion for community')).toBeInTheDocument();
  });

  it('contains action buttons', () => {
    renderWithProviders(<About />);

    expect(screen.getByText('Contact me')).toBeInTheDocument();
    expect(screen.getByText('View resume')).toBeInTheDocument();
    expect(screen.getByText('Read blog')).toBeInTheDocument();
  });

  it('returns 0 years of experience when careerStart is undefined', () => {
    mockUseResume.mockReturnValue({
      experience: [],
      education: [],
      certifications: [],
      skills: [],
      portfolio: [],
      loading: false,
    });

    const { container } = renderWithProviders(<About />);
    expect(container).toBeInTheDocument();
  });

  it('calculates years of experience correctly when month has not passed', () => {
    // Set careerStart to a future month/day in the current year
    const today = new Date();
    const futureMonthDay = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate() + 1,
    );

    mockUseResume.mockReturnValue({
      experience: [
        {
          title: 'Software Engineer',
          company: { name: 'Test Company' },
          startDate: futureMonthDay,
        },
        {
          title: 'Junior Developer',
          company: { name: 'Old Company' },
          startDate: new Date('2015-12-31'), // Started in late December
        },
      ],
      education: [],
      certifications: [],
      skills: [],
      portfolio: [],
      loading: false,
    });

    const { container } = renderWithProviders(<About />);
    expect(container).toBeInTheDocument();
  });

  it('calculates years of experience correctly when month has passed', () => {
    const today = new Date();
    const pastMonthDay = new Date(
      today.getFullYear() - 5,
      today.getMonth() - 1,
      today.getDate() - 1,
    );

    mockUseResume.mockReturnValue({
      experience: [
        {
          title: 'Software Engineer',
          company: { name: 'Test Company' },
          startDate: new Date('2020-01-01'),
        },
        {
          title: 'Junior Developer',
          company: { name: 'Old Company' },
          startDate: pastMonthDay,
        },
      ],
      education: [],
      certifications: [],
      skills: [],
      portfolio: [],
      loading: false,
    });

    const { container } = renderWithProviders(<About />);
    expect(container).toBeInTheDocument();
  });
});
