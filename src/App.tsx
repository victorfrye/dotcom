import './styles/App.css'
import MainLayout from './Components/Layouts/MainLayout'
import HomePage from './Components/Pages/HomePage'

const App = (): JSX.Element => {

  return (
    <MainLayout child={<HomePage />} />
  );
};

export default App;
