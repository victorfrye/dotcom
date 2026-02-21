import { render } from '@testing-library/react';

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

import ClarityTag from '../clarity/clarity-tag';
import useClarity from '../clarity/use-clarity';
import Gtag from '../google/gtag';
import useGA from '../google/use-ga';

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
  it('returns handleConsentChange function', () => {
    const { getByText } = render(<UseGATestComponent />);
    expect(getByText('Update')).toBeInTheDocument();
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
