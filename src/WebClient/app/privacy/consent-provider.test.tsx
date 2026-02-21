import { render, screen } from '@testing-library/react';
import { useContext } from 'react';

import ConsentProvider, { ConsentContext } from './consent-provider';

const mockHandleGAConsentChange = jest.fn();
const mockHandleClarityConsentChange = jest.fn();
const mockHandleValueChange = jest.fn();

jest.mock('@/analytics', () => ({
  useGA: () => ({ handleConsentChange: mockHandleGAConsentChange }),
  useClarity: () => ({ handleConsentChange: mockHandleClarityConsentChange }),
}));

jest.mock('@/storage', () => ({
  readValue: jest.fn(() => null),
  useLocalStorage: jest.fn(() => ({
    value: null,
    handleValueChange: mockHandleValueChange,
  })),
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
  beforeEach(() => {
    mockHandleGAConsentChange.mockClear();
    mockHandleClarityConsentChange.mockClear();
    mockHandleValueChange.mockClear();
  });

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

  it('calls analytics handlers when onConsentChange is invoked', () => {
    function TestConsumerWithButton() {
      const { onConsentChange } = useContext(ConsentContext);
      return (
        <button
          type="button"
          onClick={() =>
            onConsentChange({ analytics: true, advertising: false })
          }
        >
          Change Consent
        </button>
      );
    }

    render(
      <ConsentProvider>
        <TestConsumerWithButton />
      </ConsentProvider>,
    );

    const button = screen.getByText('Change Consent');
    button.click();

    expect(mockHandleValueChange).toHaveBeenCalledWith({
      analytics: true,
      advertising: false,
    });
    expect(mockHandleGAConsentChange).toHaveBeenCalledWith({
      analytics: true,
      advertising: false,
    });
    expect(mockHandleClarityConsentChange).toHaveBeenCalledWith(true);
  });
});
