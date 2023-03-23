import React from 'react';
import logoImgUrl from '../../assets/Logo.png';
import Button from './Button';

function NavBar() {
  return (
    <nav className='w-screen h-12 bg-blue-500 flex flex-row'>
      <img src={logoImgUrl} className='h-auto w-auto m-2' />
      <h1 className='my-auto mx-2 text-2xl text-bold font-semibold font-serif'>
        Riff Organizer
      </h1>
      <h1 className='my-auto mx-2 text-2xl text-bold font-semibold font-serif bg-slate-50'>
        Start riffing today
      </h1>
      <Button special>Sign up</Button>
      <Button special>Sign in</Button>
    </nav>
  );
}

export default NavBar;
