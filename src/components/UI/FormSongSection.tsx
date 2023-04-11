import React from 'react';

type FormSongSectionType = {
  name: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const SectionActiveClass = `inline-flex items-center justify-between w-full 
  px-2 md:py-2 md:px-4 text-slate-500 bg-white 
  border-2 border-slate-200 rounded-md cursor-pointer 
  dark:hover:text-slate-300 dark:border-slate-700 peer-checked:border-blue-500 
  hover:text-slate-600 dark:peer-checked:text-slate-300 peer-checked:text-slate-600 
  hover:bg-slate-50 dark:text-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700`;

const SectionDisabledClass = `inline-flex items-center justify-between w-full 
  px-2 md:py-2 md:px-4 rounded-md cursor-not-allowed
  bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-500
  `;

const FormSongSection = React.forwardRef(
  (props: FormSongSectionType, ref: React.LegacyRef<HTMLInputElement>) => {
    const SongSectionClass = props.disabled
      ? SectionDisabledClass
      : SectionActiveClass;
    return (
      <li>
        <input
          disabled={props.disabled}
          type='checkbox'
          id={`id-${props.name}`}
          className='hidden peer'
          onChange={props.onChange}
          ref={ref}
        />
        <label htmlFor={`id-${props.name}`} className={`${SongSectionClass}`}>
          <p className='w-full text-base font-bold'>{props.name}</p>
        </label>
      </li>
    );
  }
);

export default FormSongSection;
