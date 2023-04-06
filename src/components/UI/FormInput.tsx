import React from 'react';

type FormIntutType = {
  inputLabel: string;
  inputType: string;
  inputId: string;
  hasError?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

const InputDefaultClass =
  'dark:bg-slate-600 bg-slate-100 appearance-none border-2 border-slate-300 dark:border-slate-500 rounded w-full py-2 px-4 text-slate-800 dark:text-slate-100 leading-tight focus:outline-none focus:bg-slate-50 focus:border-blue-500 dark:focus:bg-slate-900';

const InputErrorClass =
  'dark:bg-red-200 dark:text-slate-800 bg-red-100 focus:border-red-500 dark:focus:text-slate-100';

const FormInput = React.forwardRef(
  (props: FormIntutType, ref: React.LegacyRef<HTMLInputElement>) => {
    return (
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-1/3'>
          <label
            className='block text-slate-800 dark:text-slate-200 font-bold md:text-right mb-1 md:mb-0 pr-4'
            htmlFor={props.inputId}>
            {props.inputLabel}
          </label>
        </div>
        <div className='md:w-2/3'>
          <input
            className={`${InputDefaultClass} ${
              props.hasError ? InputErrorClass : ''
            }`}
            id={props.inputId}
            type={props.inputType}
            onChange={props.onChange}
            onBlur={props.onBlur}
            ref={ref}
          />
        </div>
      </div>
    );
  }
);

export default FormInput;
