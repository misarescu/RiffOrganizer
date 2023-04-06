import React from 'react';
import welcomeImgUrl from '../assets/WelcomePageImage.png';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/user-slice';

function HomePage() {
  const dispatch = useDispatch();
  dispatch(userActions.resetUser());
  return (
    <div className='indent-0 md:text-2xl text-slate-800 dark:text-slate-200 text-center font-serif'>
      <img
        src={welcomeImgUrl}
        className='w-screen md:object-cover md:aspect-[3/1] border-b-8 border-slate-800 dark:border-slate-200'
      />
      <h1 className='text-2xl md:text-4xl font-extrabold text-center'>
        Start your guitar journey!
      </h1>
      <p>
        No matter if you just started your guitar journey or you are already on
        the road, you might have found it tricky to keep track of everything
        you've learned.
      </p>{' '}
      <br />
      <p>If that's the case, you're in the right place!</p>
      <br />
      <p>
        Riff Organizer will help you keep track of your melodies and the
        progress you made with each of them. Just add the songs you want to
        learn and mark your progress as you go and Riff Organizer will remember
        it all for you!
      </p>
    </div>
  );
}

export default HomePage;
