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
    <div className='bg-slate-50 dark:bg-slate-900 h-auto'>
      <div className='bg-slate-200 dark:bg-slate-800 min-h-screen w-screen md:w-4/5 mx-auto md:shadow-2xl md:shadow-slate-800/50  md:dark:shadow-slate-200/20'>
        <NavBar />
        <HomePage />
      </div>
    </div>
  );
}

export default App;
