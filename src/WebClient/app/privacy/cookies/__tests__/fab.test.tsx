import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../../test-utils';
import CookieFab from '../fab';

describe('CookieFab', () => {
  it('renders a button', () => {
    renderWithProviders(<CookieFab onClick={jest.fn()} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
