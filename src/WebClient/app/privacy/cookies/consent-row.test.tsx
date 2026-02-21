import { renderWithProviders } from '@test-utils';
import { screen } from '@testing-library/react';
import CookieConsentRow from './consent-row';

describe('CookieConsentRow', () => {
  it('renders the title', () => {
    renderWithProviders(
      <CookieConsentRow
        title="Analytics"
        description="Analytics cookies description"
        checked={true}
      />,
    );
    expect(screen.getByText('Analytics')).toBeInTheDocument();
  });

  it('renders the description', () => {
    renderWithProviders(
      <CookieConsentRow
        title="Analytics"
        description="Analytics cookies description"
        checked={false}
      />,
    );
    expect(
      screen.getByText('Analytics cookies description'),
    ).toBeInTheDocument();
  });

  it('renders a switch', () => {
    renderWithProviders(
      <CookieConsentRow
        title="Analytics"
        description="Description"
        checked={true}
      />,
    );
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });
});
