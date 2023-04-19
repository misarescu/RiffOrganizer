import React from 'react';
import { useDispatch } from 'react-redux';
import { songsActions } from '../../store/songs-slice';

function Search() {
  const dispatch = useDispatch();
  function searchFilterHandler(event: React.ChangeEvent<HTMLInputElement>) {
    // register changes only after a short amount of typing
    setTimeout(() => {
      dispatch(songsActions.setSongFilter(event.target.value));
    }, 500);
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className='w-1/2'>
        <div className='relative '>
          <div className='absolute inset-y-0 left-0 pl-2 pointer-events-none flex items-center'>
            <svg
              aria-hidden='true'
              className='w-5 h-5 text-slate-800 dark:text-slate-200'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
            </svg>
          </div>
          <input
            className='w-full block rounded-md pl-9 text-2xl text-bold font-semibold font-serif placeholder-slate-400 dark:placeholder-slate-600 text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-800'
            placeholder='Search'
            type='text'
            onChange={searchFilterHandler}
          />
        </div>
      </form>
    </>
  );
}

export default Search;
