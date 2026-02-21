import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../test-utils';
import Policy from '../policy';

describe('Policy', () => {
  it('renders the policy title', () => {
    renderWithProviders(
      <Policy date="2025-01-01">
        <p>Policy content</p>
      </Policy>,
    );
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('renders children', () => {
    renderWithProviders(
      <Policy date="2025-01-01">
        <p>Policy content</p>
      </Policy>,
    );
    expect(screen.getByText('Policy content')).toBeInTheDocument();
  });

  it('renders the formatted last updated date', () => {
    renderWithProviders(
      <Policy date="2025-06-15">
        <p>Content</p>
      </Policy>,
    );
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
    expect(screen.getByText(/June/)).toBeInTheDocument();
  });
});
