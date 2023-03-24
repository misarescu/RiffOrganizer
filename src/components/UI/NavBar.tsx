import React from 'react';
import logoImgUrl from '../../assets/Logo.png';
import Button from './Button';

function NavBar() {
  return (
    <nav className='w-screen h-auto bg-blue-500 flex flex-row p-2 justify-between items-center'>
      <div className='h-auto w-auto flex flex-row items-center space-x-2 '>
        <img src={logoImgUrl} className='h-12 w-12' />
        <h1 className='hidden lg:inline-flex text-2xl text-bold font-semibold font-serif'>
          Riff Organizer
        </h1>
      </div>
      <input
        className='w-1/2 text-2xl text-bold font-semibold font-serif bg-slate-50 rounded-full'
        placeholder='Searchbar'
      />

      <div className='w-auto h-max flex justify-center items-center flex-col space-y-2 space-x-0 lg:flex-row lg:space-y-0 lg:space-x-2 grow-0'>
        <Button special className='text-xs lg:text-base'>
          Sign up
        </Button>
        <Button special className='text-xs lg:text-base'>
          Sign in
        </Button>
      </div>
    </nav>
  );
}

export default NavBar;
