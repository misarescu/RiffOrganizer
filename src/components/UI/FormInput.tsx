import React from 'react';

type FormInputType = {
  inputLabel: string;
  inputType: string;
  inputId: string;
  hasError?: boolean;
  errorMessage?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

const InputDefaultClass = `dark:bg-slate-600 bg-slate-100 appearance-none border-2 border-slate-300 dark:border-slate-500 
  rounded w-full py-2 px-4 text-slate-800 dark:text-slate-100 leading-tight
   focus:outline-none focus:bg-slate-50 focus:border-blue-500 dark:focus:bg-slate-900`;

const InputErrorClass = `dark:bg-red-200 bg-red-100 appearance-none border-2 border-slate-300 dark:border-slate-500 
  rounded w-full py-2 px-4 text-slate-800 dark:text-slate-100 leading-tight
   focus:outline-none focus:bg-slate-50 focus:border-red-500 dark:focus:bg-slate-900 dark:focus:text-slate-100`;

const FormInput = React.forwardRef(
  (props: FormInputType, ref: React.LegacyRef<HTMLInputElement>) => {
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
          {props.hasError ? (
            <label className='text-red-500'>{props.errorMessage}</label>
          ) : null}
          <input
            className={`${
              !props.hasError ? InputDefaultClass : InputErrorClass
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
