import { renderWithProviders } from '@test-utils';
import { fireEvent, screen } from '@testing-library/react';
import Footer from './footer';

jest.mock('@/assets', () => ({
  BlueskyIcon: (props: Record<string, unknown>) => <svg {...props} />,
  GitHubIcon: (props: Record<string, unknown>) => <svg {...props} />,
  LinkedInIcon: (props: Record<string, unknown>) => <svg {...props} />,
  ThreadsIcon: (props: Record<string, unknown>) => <svg {...props} />,
  XboxIcon: (props: Record<string, unknown>) => <svg {...props} />,
}));

const mockOnColorModeToggle = jest.fn();

jest.mock('@/theme', () => ({
  useColorMode: () => ({
    colorMode: 'light',
    isLight: true,
    isDark: false,
    onColorModeToggle: mockOnColorModeToggle,
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

  it('calls onColorModeToggle when toggle button is clicked', () => {
    renderWithProviders(<Footer />);
    const toggleButton = screen.getByRole('button', { name: /dark/i });
    fireEvent.click(toggleButton);
    expect(mockOnColorModeToggle).toHaveBeenCalled();
  });
});
