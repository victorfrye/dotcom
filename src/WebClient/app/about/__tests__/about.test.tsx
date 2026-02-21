import { screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { renderWithProviders } from '../../../test-utils';
import About from '../about';

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

jest.mock('@/resume', () => ({
  useResume: () => ({
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
  }),
}));

describe('About', () => {
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
});
