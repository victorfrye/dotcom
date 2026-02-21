import { render, screen } from '@testing-library/react';
import { useContext } from 'react';

import ConsentProvider, { ConsentContext } from '../consent-provider';

jest.mock('@/analytics', () => ({
  useGA: () => ({ handleConsentChange: jest.fn() }),
  useClarity: () => ({ handleConsentChange: jest.fn() }),
}));

jest.mock('@/storage', () => ({
  readValue: jest.fn(() => null),
  useLocalStorage: () => ({ value: null, handleValueChange: jest.fn() }),
}));

function TestConsumer() {
  const { consent, onConsentChange } = useContext(ConsentContext);
  return (
    <div>
      <span data-testid="consent">{consent === null ? 'null' : 'defined'}</span>
      <span data-testid="handler">
        {typeof onConsentChange === 'function' ? 'function' : 'not'}
      </span>
    </div>
  );
}

describe('ConsentProvider', () => {
  it('renders children', () => {
    render(
      <ConsentProvider>
        <div data-testid="child">Hello</div>
      </ConsentProvider>,
    );

    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('provides consent context to children', () => {
    render(
      <ConsentProvider>
        <TestConsumer />
      </ConsentProvider>,
    );

    expect(screen.getByTestId('consent')).toHaveTextContent('null');
    expect(screen.getByTestId('handler')).toHaveTextContent('function');
  });
});
