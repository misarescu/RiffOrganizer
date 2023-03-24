import Button from './components/UI/Button';
import Card from './components/UI/Card';
import Dropdown from './components/UI/Dropdown';
import Footer from './components/UI/Footer';
import Form from './components/UI/Form';
import Header from './components/UI/Header';
import NavBar from './components/UI/NavBar';
import Search from './components/UI/Search';
import RootLayout from './layouts/Root';
import RootPage from './pages/Root';
import HomePage from './pages/Home';
import SongPage from './pages/Song';
import UserPage from './pages/User';

function App() {
  return (
    <div className=''>
      <NavBar />
      <Button>Start Riffing</Button>
      <h1 className='text-4xl font-extrabold dark:text-white'>
        Welcome to Riff Organizer!
      </h1>
      <p className='text-3xl font-bold underline'>
        The place where you will start your guitar journey!
      </p>
    </div>
  );
}

export default App;
