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

  async function selectionHandler() {
    setHideDropDown(true);
    const newSection: SectionType = {
      ...props.section,
      status: sectionStatusRef.filter(
        (section) => section.ref.current?.checked === true
      )[0].status,
    };
    console.log(newSection);
    // send update to the store
    // TODO: send a request to the backend to sync the data
    const { error } = await dbClient
      .from('sections')
      .update(newSection)
      .eq('id', newSection.id);

    console.log('error: %o', error);

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
        className={props.className}>
        {props.section.name}
      </button>
      <div
        id='dropdownDefaultRadio'
        hidden={hideDropDown}
        className='fixed mt-2 z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'>
        <ul
          className='p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200'
          aria-labelledby='dropdownRadioButton'>
          <li>
            <div className='flex items-center'>
              <input
                onClick={selectionHandler}
                ref={sectionStatusRef[0].ref}
                id='default-radio-1'
                type='radio'
                value=''
                name='default-radio'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
              />
              <label
                htmlFor='default-radio-1'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                not started
              </label>
            </div>
          </li>
          <li>
            <div className='flex items-center'>
              <input
                onClick={selectionHandler}
                ref={sectionStatusRef[1].ref}
                id='default-radio-2'
                type='radio'
                value=''
                name='default-radio'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
              />
              <label
                htmlFor='default-radio-2'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                in progress
              </label>
            </div>
          </li>
          <li>
            <div className='flex items-center'>
              <input
                onClick={selectionHandler}
                ref={sectionStatusRef[2].ref}
                id='default-radio-3'
                type='radio'
                value=''
                name='default-radio'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
              />
              <label
                htmlFor='default-radio-3'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
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
