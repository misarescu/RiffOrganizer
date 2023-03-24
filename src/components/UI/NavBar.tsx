import React from 'react';
import logoImgUrl from '../../assets/Logo.png';
import Button from './Button';
import Search from './Search';

function NavBar() {
  return (
    <nav className='w-full h-auto bg-blue-500 flex flex-row p-2 justify-between items-center'>
      <div className='h-auto w-auto flex flex-row items-center space-x-2 '>
        <img src={logoImgUrl} className='h-12 w-12' />
        <h1 className='hidden md:inline-flex text-2xl text-bold font-semibold font-serif text-slate-800'>
          Riff Organizer
        </h1>
      </div>
      <Search isVisible={false} />

      <div className='w-auto h-max flex justify-center items-center flex-col space-y-1 space-x-0 md:flex-row md:space-y-0 md:space-x-2 grow-0'>
        <Button special>Sign up</Button>
        <Button special>Sign in</Button>
      </div>
    </nav>
  );
}

export default NavBar;
