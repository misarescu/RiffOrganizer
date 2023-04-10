import React from 'react';

function FormSongSectionList(props: { children: React.ReactNode }) {
  return (
    <div className='md:flex md:items-center mb-6 md:mb-6 min-w-fit'>
      <div className='md:w-1/3'>
        <p className='block text-slate-800 dark:text-slate-200 font-bold md:text-right mb-1 md:mb-0 pr-4'>
          Default Sections
        </p>
      </div>
      <div className='md:w-2/3  flex justify-between flex-wrap space-x-2 space-y-2'>
        <ul className='flex flex-wrap w-full gap-4 md:gap-6'>
          {props.children}
        </ul>
      </div>
    </div>
  );
}

export default FormSongSectionList;
