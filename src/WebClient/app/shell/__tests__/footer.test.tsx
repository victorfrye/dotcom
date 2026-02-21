import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../test-utils';
import Footer from '../footer';

jest.mock('@/assets', () => ({
  BlueskyIcon: (props: Record<string, unknown>) => <svg {...props} />,
  GitHubIcon: (props: Record<string, unknown>) => <svg {...props} />,
  LinkedInIcon: (props: Record<string, unknown>) => <svg {...props} />,
  ThreadsIcon: (props: Record<string, unknown>) => <svg {...props} />,
  XboxIcon: (props: Record<string, unknown>) => <svg {...props} />,
}));

jest.mock('@/theme', () => ({
  useColorMode: () => ({
    colorMode: 'light',
    isLight: true,
    isDark: false,
    onColorModeToggle: jest.fn(),
    onColorModeChange: jest.fn(),
  }),
}));

describe('Footer', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText('Privacy')).toBeInTheDocument();
  });

  it('renders the copyright text', () => {
    renderWithProviders(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© Victor Frye ${year}`)).toBeInTheDocument();
  });
});
