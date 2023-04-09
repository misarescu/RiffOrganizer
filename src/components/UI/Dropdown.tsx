import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { songsActions } from '../../store/songs-slice';
import dbClient from '../../API/dbClient';

type SectionType = {
  id: string;
  name: string;
  status: string;
};

type DropdownType = {
  section: SectionType;
  className: string;
};

function statusColorMap(status: string): string {
  switch (status) {
    case 'not started':
      return 'bg-rose-300 dark:bg-rose-800';
    case 'in progress':
      return 'bg-amber-200 dark:bg-amber-700';
    case 'finished':
      return 'bg-emerald-200 dark:bg-emerald-700';
    default:
      return '';
  }
}

function hoverColorMap(status: string): string {
  switch (status) {
    case 'not started':
      return 'hover:bg-rose-400 dark:hover:bg-rose-900';
    case 'in progress':
      return 'hover:bg-amber-300 dark:hover:bg-amber-800';
    case 'finished':
      return 'hover:bg-emerald-300 dark:hover:bg-emerald-800';
    default:
      return '';
  }
}

// Dropdown is now implemented to be project specific
// TODO: find a more generic architecture for it

function Dropdown(props: DropdownType) {
  const [hideDropDown, setHideDropDown] = useState(true);
  const dispatch = useDispatch();

  const sectionStatusRef = [
    { ref: useRef<HTMLInputElement>(null), status: 'not started' }, // 0
    { ref: useRef<HTMLInputElement>(null), status: 'in progress' }, // 1
    { ref: useRef<HTMLInputElement>(null), status: 'finished' }, // 2
  ];

  // useEffect(() => {
  //   console.table(
  //     sectionStatusRef.map((section) => {
  //       return {
  //         status: section.status,
  //         checked: section.ref.current?.checked,
  //       };
  //     })
  //   );
  // }, [sectionStatusRef]);

  function isInputSelected(): boolean {
    // if one input is checked return true
    // if none is selected return false
    return (
      sectionStatusRef
        .map((section) => section.ref.current?.checked)
        .filter((selection) => selection).length > 0
    );
  }

  async function updateSectionOnBackend(newSection: SectionType) {
    // send update to the store & backend
    const { error } = await dbClient
      .from('sections')
      .update(newSection)
      .eq('id', newSection.id);
  }

  function selectionHandler() {
    setHideDropDown(true);
    const newSection: SectionType = {
      ...props.section,
      status: sectionStatusRef.filter(
        (section) => section.ref.current?.checked === true
      )[0].status,
    };

    updateSectionOnBackend(newSection);
    dispatch(songsActions.updateSection(newSection));
  }

  return (
    <>
      <button
        id='dropdownRadioButton'
        onClick={() => {
          setHideDropDown((state) => !state);
        }}
        onBlur={() => {
          console.log('close dropdown');
          console.log('selection is: %s', isInputSelected());
          // setHideDropDown(true);
        }}
        data-dropdown-toggle='dropdownDefaultRadio'
        className={`${props.className}`}>
        {props.section.name}
      </button>

      <div
        id='dropdownDefaultRadio'
        hidden={hideDropDown}
        onClick={() => setHideDropDown(true)}
        className='absolute mt-2 z-20 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'>
        <ul
          className='p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200 '
          aria-labelledby='dropdownRadioButton'>
          <li className=''>
            <div className='flex items-center'>
              <input
                hidden
                onClick={selectionHandler}
                ref={sectionStatusRef[0].ref}
                id={`${props.section.id}-not-started`}
                type='radio'
                value=''
                name='default-radio'
                // className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
              />
              <label
                htmlFor={`${props.section.id}-not-started`}
                className='w-full ml-2 text-sm font-medium dark:text-rose-300 text-rose-800 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-rose-400 dark:hover:bg-rose-900 '>
                not started
              </label>
            </div>
          </li>
          <li>
            <div className='flex items-center'>
              <input
                hidden
                onClick={selectionHandler}
                ref={sectionStatusRef[1].ref}
                id={`${props.section.id}-in-progress`}
                type='radio'
                value=''
                name='default-radio'
                // className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
              />
              <label
                htmlFor={`${props.section.id}-in-progress`}
                className='w-full ml-2 text-sm font-medium dark:text-amber-200 text-amber-700 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-amber-300 dark:hover:bg-amber-800 '>
                in progress
              </label>
            </div>
          </li>
          <li>
            <div className='flex items-center'>
              <input
                hidden
                onClick={selectionHandler}
                ref={sectionStatusRef[2].ref}
                id={`${props.section.id}-finished`}
                type='radio'
                value=''
                name='default-radio'
                // className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
              />
              <label
                htmlFor={`${props.section.id}-finished`}
                className='w-full ml-2 text-sm font-medium dark:text-emerald-200 text-emerald-700 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-emerald-300 dark:hover:bg-emerald-800 '>
                finished
              </label>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Dropdown;
