import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../../test-utils';
import CookieConsentDialog from '../consent-dialog';

describe('CookieConsentDialog', () => {
  const defaultProps = {
    open: true,
    onAccept: jest.fn(),
    onReject: jest.fn(),
    onManage: jest.fn(),
  };

  it('renders the dialog title', () => {
    renderWithProviders(<CookieConsentDialog {...defaultProps} />);
    expect(screen.getByText('We value your privacy')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    renderWithProviders(<CookieConsentDialog {...defaultProps} />);
    expect(
      screen.getByRole('button', { name: 'Accept all' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Reject unnecessary' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Manage cookies' }),
    ).toBeInTheDocument();
  });
});
