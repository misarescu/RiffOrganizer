import React from 'react';
import welcomeImgUrl from '../assets/WelcomePageImage.png';

function HomePage() {
  return (
    <>
      <img src={welcomeImgUrl} className=' w-screen lg:h-1/4 lg:object-cover' />
      <h1 className='text-4xl font-extrabold dark:text-white'>
        Welcome to Riff Organizer!
      </h1>
      <p className='text-3xl font-bold underline'>
        The place where you will start your guitar journey!
      </p>
    </>
  );
}

export default HomePage;
