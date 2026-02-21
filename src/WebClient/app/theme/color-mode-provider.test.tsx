import { renderWithProviders } from '@test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { useContext } from 'react';
import { useLocalStorage } from '@/storage';
import useThemeMediaQuery from '@/theme/use-theme-media-query';
import ColorModeProvider, { ColorModeContext } from './color-mode-provider';

const mockHandleValueChange = jest.fn();

jest.mock('@/storage', () => ({
  useLocalStorage: jest.fn(() => ({
    value: null,
    handleValueChange: mockHandleValueChange,
  })),
}));

jest.mock('@/theme/init-color-mode', () => ({
  __esModule: true,
  default: () => 'light',
}));

jest.mock('@/theme/use-theme-media-query', () => ({
  __esModule: true,
  default: jest.fn(() => false),
}));

const mockUseLocalStorage = useLocalStorage as jest.MockedFunction<
  typeof useLocalStorage
>;
const mockUseThemeMediaQuery = useThemeMediaQuery as jest.MockedFunction<
  typeof useThemeMediaQuery
>;

function TestConsumer() {
  const { colorMode, isLight, isDark } = useContext(ColorModeContext);
  return (
    <div>
      <span data-testid="colorMode">{colorMode}</span>
      <span data-testid="isLight">{String(isLight)}</span>
      <span data-testid="isDark">{String(isDark)}</span>
    </div>
  );
}

function TestConsumerWithActions() {
  const { colorMode, isLight, isDark, onColorModeToggle, onColorModeChange } =
    useContext(ColorModeContext);
  return (
    <div>
      <span data-testid="colorMode">{colorMode}</span>
      <span data-testid="isLight">{String(isLight)}</span>
      <span data-testid="isDark">{String(isDark)}</span>
      <button type="button" data-testid="toggle" onClick={onColorModeToggle}>
        Toggle
      </button>
      <button
        type="button"
        data-testid="setDark"
        onClick={() => onColorModeChange('dark')}
      >
        Set Dark
      </button>
      <button
        type="button"
        data-testid="setLight"
        onClick={() => onColorModeChange('light')}
      >
        Set Light
      </button>
    </div>
  );
}

describe('ColorModeProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children', () => {
    renderWithProviders(
      <ColorModeProvider>
        <div data-testid="child">Hello</div>
      </ColorModeProvider>,
    );

    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('provides colorMode context', () => {
    renderWithProviders(
      <ColorModeProvider>
        <TestConsumer />
      </ColorModeProvider>,
    );

    expect(screen.getByTestId('colorMode')).toBeInTheDocument();
  });

  it('default colorMode is light when no stored preference', () => {
    renderWithProviders(
      <ColorModeProvider>
        <TestConsumer />
      </ColorModeProvider>,
    );

    expect(screen.getByTestId('colorMode')).toHaveTextContent('light');
  });

  it('isLight is true when colorMode is light', () => {
    renderWithProviders(
      <ColorModeProvider>
        <TestConsumer />
      </ColorModeProvider>,
    );

    expect(screen.getByTestId('isLight')).toHaveTextContent('true');
  });

  it('isDark is false when colorMode is light', () => {
    renderWithProviders(
      <ColorModeProvider>
        <TestConsumer />
      </ColorModeProvider>,
    );

    expect(screen.getByTestId('isDark')).toHaveTextContent('false');
  });

  it('onColorModeToggle changes from light to dark', () => {
    renderWithProviders(
      <ColorModeProvider>
        <TestConsumerWithActions />
      </ColorModeProvider>,
    );

    expect(screen.getByTestId('colorMode')).toHaveTextContent('light');

    fireEvent.click(screen.getByTestId('toggle'));

    expect(screen.getByTestId('colorMode')).toHaveTextContent('dark');
    expect(screen.getByTestId('isDark')).toHaveTextContent('true');
    expect(screen.getByTestId('isLight')).toHaveTextContent('false');
  });

  it('onColorModeToggle changes from dark back to light', () => {
    renderWithProviders(
      <ColorModeProvider>
        <TestConsumerWithActions />
      </ColorModeProvider>,
    );

    fireEvent.click(screen.getByTestId('toggle'));
    expect(screen.getByTestId('colorMode')).toHaveTextContent('dark');

    fireEvent.click(screen.getByTestId('toggle'));
    expect(screen.getByTestId('colorMode')).toHaveTextContent('light');
  });

  it('onColorModeChange sets dark mode directly', () => {
    renderWithProviders(
      <ColorModeProvider>
        <TestConsumerWithActions />
      </ColorModeProvider>,
    );

    expect(screen.getByTestId('colorMode')).toHaveTextContent('light');

    fireEvent.click(screen.getByTestId('setDark'));

    expect(screen.getByTestId('colorMode')).toHaveTextContent('dark');
    expect(screen.getByTestId('isDark')).toHaveTextContent('true');
  });

  it('onColorModeChange sets light mode directly', () => {
    renderWithProviders(
      <ColorModeProvider>
        <TestConsumerWithActions />
      </ColorModeProvider>,
    );

    fireEvent.click(screen.getByTestId('setDark'));
    expect(screen.getByTestId('colorMode')).toHaveTextContent('dark');

    fireEvent.click(screen.getByTestId('setLight'));

    expect(screen.getByTestId('colorMode')).toHaveTextContent('light');
    expect(screen.getByTestId('isLight')).toHaveTextContent('true');
  });

  it('does not override colorMode when stored preference exists', () => {
    mockUseLocalStorage.mockReturnValue({
      value: { colorMode: 'dark' },
      handleValueChange: mockHandleValueChange,
    });
    mockUseThemeMediaQuery.mockReturnValue(false);

    renderWithProviders(
      <ColorModeProvider>
        <TestConsumer />
      </ColorModeProvider>,
    );

    expect(screen.getByTestId('colorMode')).toHaveTextContent('dark');
  });

  it('uses system preference when no stored preference', () => {
    mockUseLocalStorage.mockReturnValue({
      value: null,
      handleValueChange: mockHandleValueChange,
    });
    mockUseThemeMediaQuery.mockReturnValue(true);

    renderWithProviders(
      <ColorModeProvider>
        <TestConsumer />
      </ColorModeProvider>,
    );

    expect(screen.getByTestId('colorMode')).toHaveTextContent('dark');
  });
});
