import React from 'react';

function FormButtonList(props: { children: React.ReactNode }) {
  return (
    <div className='md:flex md:items-center'>
      <div className='md:w-1/3' />
      <div className='md:w-2/3 flex justify-between'>{props.children}</div>
    </div>
  );
}

export default FormButtonList;
