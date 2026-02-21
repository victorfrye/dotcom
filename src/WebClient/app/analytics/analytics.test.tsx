import { render, renderHook } from '@testing-library/react';

jest.mock('@microsoft/clarity', () => ({
  init: jest.fn(),
  consent: jest.fn(),
}));

jest.mock('next/script', () => {
  return {
    __esModule: true,
    default: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
      id?: string;
      src?: string;
      async?: boolean;
    }) => <script data-testid={props.id}>{children}</script>,
  };
});

import ClarityTag from './clarity/clarity-tag';
import useClarity from './clarity/use-clarity';
import Gtag from './google/gtag';
import useGA from './google/use-ga';

function UseClarityTestComponent() {
  const { handleConsentChange } = useClarity();
  return (
    <button type="button" onClick={() => handleConsentChange(true)}>
      Toggle
    </button>
  );
}

function UseGATestComponent() {
  const { handleConsentChange } = useGA();
  return (
    <button
      type="button"
      onClick={() =>
        handleConsentChange({ analytics: true, advertising: false })
      }
    >
      Update
    </button>
  );
}

describe('useClarity', () => {
  it('returns handleConsentChange function', () => {
    const { getByText } = render(<UseClarityTestComponent />);
    expect(getByText('Toggle')).toBeInTheDocument();
  });
});

describe('useGA', () => {
  beforeEach(() => {
    // @ts-expect-error - mocking gtag
    delete window.gtag;
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns handleConsentChange function', () => {
    const { getByText } = render(<UseGATestComponent />);
    expect(getByText('Update')).toBeInTheDocument();
  });

  it('calls window.gtag when available', () => {
    const mockGtag = jest.fn();
    // @ts-expect-error - mocking gtag
    window.gtag = mockGtag;

    const { result } = renderHook(() => useGA());

    result.current.handleConsentChange({ analytics: true, advertising: false });

    expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
      ad_storage: 'denied',
      analytics_storage: 'granted',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  });

  it('calls window.gtag with advertising granted', () => {
    const mockGtag = jest.fn();
    // @ts-expect-error - mocking gtag
    window.gtag = mockGtag;

    const { result } = renderHook(() => useGA());

    result.current.handleConsentChange({ analytics: true, advertising: true });

    expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
  });

  it('logs error when window.gtag is not available', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');

    const { result } = renderHook(() => useGA());

    result.current.handleConsentChange({ analytics: true, advertising: false });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Google Analytics gtag function is not available.',
    );
  });

  it('does not call window.gtag when not a function', () => {
    // @ts-expect-error - mocking gtag as non-function
    window.gtag = 'not a function';

    const { result } = renderHook(() => useGA());
    const consoleErrorSpy = jest.spyOn(console, 'error');

    result.current.handleConsentChange({ analytics: true, advertising: false });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Google Analytics gtag function is not available.',
    );
  });
});

describe('ClarityTag', () => {
  it('renders null (no visible output)', () => {
    const { container } = render(<ClarityTag projectId="test-id" />);
    expect(container.innerHTML).toBe('');
  });
});

describe('Gtag', () => {
  it('renders script elements', () => {
    const { container } = render(<Gtag tagId="G-TEST123" />);
    expect(container).toBeTruthy();
  });
});
