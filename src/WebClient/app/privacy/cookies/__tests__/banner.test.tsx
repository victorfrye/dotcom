import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../../test-utils';
import CookieBanner from '../banner';

jest.mock('@/privacy/cookies/use-cookie-banner', () => ({
  __esModule: true,
  default: () => ({
    showFab: true,
    consentDialogOpen: true,
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

describe('CookieBanner', () => {
  it('renders the consent dialog', () => {
    renderWithProviders(<CookieBanner />);
    expect(screen.getByText('We value your privacy')).toBeInTheDocument();
  });

  it('renders accept and reject buttons', () => {
    renderWithProviders(<CookieBanner />);
    expect(
      screen.getByRole('button', { name: 'Accept all' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Reject unnecessary' }),
    ).toBeInTheDocument();
  });
});
