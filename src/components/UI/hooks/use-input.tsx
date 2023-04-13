import { useReducer } from 'react';

type InputType = {
  value?: string;
  isTouched: boolean;
};

type ActionType = {
  type: string;
  value?: string;
};

export type FormInputType = {
  value?: string;
  isValid: boolean;
  hasError: boolean;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurHandler: (event: React.FocusEvent<HTMLInputElement>) => void;
  reset: () => void;
};

const initialInputState: InputType = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state: InputType, action: ActionType) => {
  switch (action.type) {
    case 'INPUT':
      return { isTouched: state.isTouched, value: action.value };
    case 'BLUR':
      return { isTouched: true, value: state.value };
    case 'RESET':
      return { isTouched: false, value: '' };
    default: // do nothing
  }

  return initialInputState;
};

const useInput = (validateValue: (inputStr: string) => boolean) => {
  const [inputState, dispatchInput] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value as string);
  const hasError = !valueIsValid && inputState.isTouched;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchInput({ type: 'INPUT', value: event.target.value });
  };

  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    dispatchInput({ type: 'BLUR', value: '' });
  };

  const reset = () => {
    dispatchInput({ type: 'RESET', value: '' });
  };

  const result: FormInputType = {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    onChangeHandler,
    onBlurHandler,
    reset,
  };

  return result;
};

export default useInput;
