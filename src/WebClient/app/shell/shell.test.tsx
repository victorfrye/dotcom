import { renderWithProviders } from '@test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import Shell from './shell';

jest.mock('@microsoft/clarity', () => ({
  init: jest.fn(),
  consent: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
}));

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

jest.mock('@/privacy/use-consent', () => ({
  __esModule: true,
  default: () => ({
    consent: { analytics: true, advertising: true },
    onConsentChange: jest.fn(),
  }),
}));

jest.mock('@/privacy/cookies/use-cookie-banner', () => ({
  __esModule: true,
  default: () => ({
    showFab: false,
    consentDialogOpen: false,
    managerDialogOpen: false,
    analyticsEnabled: true,
    advertisingEnabled: true,
    handleAcceptClick: jest.fn(),
    handleRejectClick: jest.fn(),
    handleManageClick: jest.fn(),
    handleSaveClick: jest.fn(),
    handleAnalyticsToggle: jest.fn(),
    handleAdvertisingToggle: jest.fn(),
    handleFabClick: jest.fn(),
  }),
}));

describe('Shell', () => {
  it('renders children', () => {
    renderWithProviders(
      <Shell>
        <p>Test content</p>
      </Shell>,
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders navigation tabs', () => {
    renderWithProviders(
      <Shell>
        <p>Content</p>
      </Shell>,
    );
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getAllByText('Resume').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Blog').length).toBeGreaterThan(0);
  });

  it('renders header and footer', () => {
    renderWithProviders(
      <Shell>
        <p>Content</p>
      </Shell>,
    );
    expect(screen.getByText('Victor Frye')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
  });

  it('selects blog tab when pathname is /blog', () => {
    (usePathname as jest.Mock).mockReturnValue('/blog');
    renderWithProviders(
      <Shell>
        <p>Content</p>
      </Shell>,
    );
    const blogTab = screen.getByRole('tab', { name: /Blog/i });
    expect(blogTab).toHaveAttribute('aria-selected', 'true');
  });

  it('selects resume tab when pathname is /resume', () => {
    (usePathname as jest.Mock).mockReturnValue('/resume');
    renderWithProviders(
      <Shell>
        <p>Content</p>
      </Shell>,
    );
    const resumeTab = screen.getByRole('tab', { name: /Resume/i });
    expect(resumeTab).toHaveAttribute('aria-selected', 'true');
  });

  it('selects no tab when pathname is unknown', () => {
    (usePathname as jest.Mock).mockReturnValue('/other');
    renderWithProviders(
      <Shell>
        <p>Content</p>
      </Shell>,
    );
    const aboutTab = screen.getByRole('tab', { name: /About/i });
    const resumeTab = screen.getByRole('tab', { name: /Resume/i });
    const blogTab = screen.getByRole('tab', { name: /Blog/i });
    expect(aboutTab).toHaveAttribute('aria-selected', 'false');
    expect(resumeTab).toHaveAttribute('aria-selected', 'false');
    expect(blogTab).toHaveAttribute('aria-selected', 'false');
  });

  it('handles tab selection for about tab', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    renderWithProviders(
      <Shell>
        <p>Content</p>
      </Shell>,
    );
    const aboutTab = screen.getByRole('tab', { name: /About/i });
    fireEvent.click(aboutTab);
    expect(aboutTab).toHaveAttribute('aria-selected', 'true');
  });

  it('handles tab selection for resume tab', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    renderWithProviders(
      <Shell>
        <p>Content</p>
      </Shell>,
    );
    const resumeTab = screen.getByRole('tab', { name: /Resume/i });
    fireEvent.click(resumeTab);
    // Tab click triggers navigation via ref
  });

  it('handles tab selection for blog tab', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    renderWithProviders(
      <Shell>
        <p>Content</p>
      </Shell>,
    );
    const blogTab = screen.getByRole('tab', { name: /Blog/i });
    fireEvent.click(blogTab);
    // Tab click triggers navigation via ref
  });
});
