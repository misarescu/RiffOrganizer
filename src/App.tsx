import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import './index.css';

function App() {
  const [countUp, setCountUp] = useState(0);
  const [countDown, setCountDown] = useState(0);

  return (
    <div className='App'>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCountUp((count) => count + 10)}>
          count is {countUp}
        </button>
        <button onClick={() => setCountDown((count) => count - 10)}>
          count is {countDown}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
