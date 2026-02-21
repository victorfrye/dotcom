import { render, screen } from '@testing-library/react';

import ProviderTree from './provider-tree';

jest.mock('@/privacy', () => ({
  ConsentProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('@/theme', () => ({
  ColorModeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('ProviderTree', () => {
  it('renders children', () => {
    render(
      <ProviderTree>
        <p>App content</p>
      </ProviderTree>,
    );
    expect(screen.getByText('App content')).toBeInTheDocument();
  });
});
