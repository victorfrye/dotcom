import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../test-utils';
import Header from '../header';

describe('Header', () => {
  it('renders the title', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('Victor Frye')).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    renderWithProviders(<Header />);
    expect(
      screen.getByText('Your friendly neighborhood developer'),
    ).toBeInTheDocument();
  });

  it('renders the avatar', () => {
    renderWithProviders(<Header />);
    expect(
      screen.getByText('Victor Frye', { selector: 'span' }),
    ).toBeInTheDocument();
  });
});
