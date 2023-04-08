import React from 'react';

type SectionType = {
  name: string;
  status: string;
};

// example section
{
  /* <Button
  outline
  special
  className='text-xs md:text-sm py-1 px-1 md:py-2 md:px-2 font-semibold rounded-none rounded-l-md'>
  {'<'}
</Button>

<Button
  outline
  special
  className='text-xs md:text-sm py-1 px-1 md:py-2 md:px-2 font-semibold rounded-none'>
  {section.name}
</Button>

<Button
  outline
  special
  className='text-xs md:text-sm py-1 px-1 md:py-2 md:px-2 font-semibold rounded-none rounded-r-md'>
  {'>'}
</Button> */
}

// map of status colors:
// not started -> rose-300 and rose-800
// in progress -> amber-200 and amber-700
// finished -> emerald-200 and emerald-700
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

function Section(props: SectionType) {
  const sectionColorClass = statusColorMap(props.status);
  console.log(sectionColorClass);

  return (
    <>
      <button className='rounded-l-md py-0 px-1 md:py-1 md:px-2 bg-emerald-200 dark:bg-emerald-700'>
        {'<'}
      </button>
      <button className='rounded-none py-0 px-1 md:py-1 md:px-2 bg-emerald-200 dark:bg-emerald-700'>
        {props.name}
      </button>
      <button className='rounded-r-md py-0 px-1 md:py-1 md:px-2 bg-emerald-200 dark:bg-emerald-700'>
        {'>'}
      </button>
    </>
  );
}

export default Section;
