import React, { useEffect, useRef, useState } from 'react';
import Dropdown from './UI/Dropdown';

type SectionType = {
  id: string;
  name: string;
  status: string;
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

function Section(props: SectionType) {
  const sectionColorClass = statusColorMap(props.status);
  const hoverColorClass = hoverColorMap(props.status);
  // console.log(sectionColorClass);

  // TODO: maybe use a Map instead of an object array

  return (
    <>
      <div className=''>
        <button
          className={`rounded-l-md py-0 px-1 md:py-1 md:px-2 ${sectionColorClass} ${hoverColorClass}`}>
          {'<'}
        </button>
        <Dropdown
          section={props}
          className={`rounded-none py-0 px-1 md:py-1 md:px-2 ${sectionColorClass} ${hoverColorClass}`}
        />
        <button
          className={`rounded-r-md py-0 px-1 md:py-1 md:px-2 ${sectionColorClass} ${hoverColorClass}`}>
          {'>'}
        </button>
      </div>
    </>
  );
}

export default Section;
