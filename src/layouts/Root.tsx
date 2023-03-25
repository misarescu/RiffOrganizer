import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/UI/NavBar';
import Footer from '../components/UI/Footer';

function RootLayout() {
  return (
    <div className='bg-slate-50 dark:bg-slate-900 h-auto'>
      <div className='flex flex-col bg-slate-200 dark:bg-slate-800 min-h-screen w-screen md:w-4/5 mx-auto md:shadow-2xl md:shadow-slate-800/50  md:dark:shadow-slate-2000'>
        <div className='flex-grow'>
          <NavBar />
          <Outlet />
        </div>
        <Footer className=' w-full flex-grow-0' />
      </div>
    </div>
  );
}

export default RootLayout;
