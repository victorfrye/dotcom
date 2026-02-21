import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../../test-utils';
import CookieManagerDialog from '../manager-dialog';

describe('CookieManagerDialog', () => {
  const defaultProps = {
    open: true,
    onAccept: jest.fn(),
    onReject: jest.fn(),
    onSave: jest.fn(),
    advertisingEnabled: true,
    analyticsEnabled: true,
    onAdvertisingToggle: jest.fn(),
    onAnalyticsToggle: jest.fn(),
  };

  it('renders the dialog title', () => {
    renderWithProviders(<CookieManagerDialog {...defaultProps} />);
    expect(screen.getByText('Manage your cookie settings')).toBeInTheDocument();
  });

  it('renders consent rows', () => {
    renderWithProviders(<CookieManagerDialog {...defaultProps} />);
    expect(screen.getByText('Necessary')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Advertising')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    renderWithProviders(<CookieManagerDialog {...defaultProps} />);
    expect(screen.getByText('Accept all')).toBeInTheDocument();
    expect(screen.getByText('Reject unnecessary')).toBeInTheDocument();
    expect(screen.getByText('Save settings')).toBeInTheDocument();
  });
});
