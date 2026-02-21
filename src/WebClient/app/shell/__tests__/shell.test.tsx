import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../test-utils';
import Shell from '../shell';

jest.mock('@microsoft/clarity', () => ({
  init: jest.fn(),
  consent: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
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
});
