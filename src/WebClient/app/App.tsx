import Profile from '@dotcom/components/Profile';
import DarkModeProvider from '@dotcom/providers/DarkMode';
import ThemeProvider from '@dotcom/providers/Theme';

const App = () => {
  return (
    <DarkModeProvider>
      <ThemeProvider>
        <Profile />
      </ThemeProvider>
    </DarkModeProvider>
  );
};

export default App;
