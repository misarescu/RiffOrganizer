import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  title?: string;
};

const CardClass = `border border-slate-800/20 shadow-slate-800/20 
                  dark:border-slate-200/20 dark:shadow-slate-200/30 
                  dark:bg-slate-700/50
                  shadow-xl
                  rounded-md w-3/4 md:w-1/2 my-4 md:my-6 flex flex-col`;

function Card(props: CardProps) {
  return (
    <div className={`${CardClass} ${props.className}`}>
      {props.title ? (
        <h1 className=' bg-blue-500 text-slate-800 text-2xl md:text-4xl font-semibold md:font-bold w-full rounded-t-md py-2 md:py-4'>
          {props.title}
        </h1>
      ) : null}
      <div className='p-8 md:p-12'>{props.children}</div>
    </div>
  );
}

export default Card;
