import React from 'react';

type ButtonProps = {
  children: string;
  disabled?: boolean;
  outline?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const ButtonShapeClass = `rounded-md py-2 px-4 text-base font-bold m-4`;

const ButtonEnabledClass = `shadow-none hover:shadow-md dark:hover:shadow-inner
  bg-blue-500 text-blue-100 hover:bg-blue-700 hover:text-blue-100
  dark:bg-blue-700 dark:text-blue-200 dark:hover:bg-blue-800 dark:hover:text-blue-200
  ${ButtonShapeClass}`;

const ButtonDisabledClass = `cursor-not-allowed
  bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-500
${ButtonShapeClass}`;

const ButtonOutlinedClass = `border-2 dark:border border-blue-300 hover:border-transparent
  bg-transparent text-blue-400 hover:bg-blue-500 hover:text-blue-100 
  dark:bg-transparent dark:text-blue-300 dark:hover:bg-blue-300 dark:hover:text-blue-800
  ${ButtonShapeClass}`;

function Button(props: ButtonProps) {
  const buttonClass = props.disabled
    ? `${ButtonDisabledClass}`
    : props.outline
    ? `${ButtonOutlinedClass}`
    : `${ButtonEnabledClass}`;

  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={` ${buttonClass} ${props.className}`}>
      {props.children}
    </button>
  );
}

export default Button;
