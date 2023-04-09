import React from 'react';
import Modal from './UI/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { StoreStateType } from '../store';
import { uiActions } from '../store/ui-slice';
import { Form } from 'react-router-dom';
import FormInput from './UI/FormInput';
import FormButtonList from './UI/FormButtonList';
import Button from './UI/Button';
import useInput from './hooks/use-input';
import dbClient from '../API/dbClient';

function SignupForm() {
  const dispatch = useDispatch();
  const isVisible = useSelector(
    (state: StoreStateType) => state.ui.isSignupFormVisible
  );
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const emailInput = useInput((value: string) => mailFormat.test(value.trim()));
  const fullNameInput = useInput((value: string) => value.trim() !== '');
  const passwordInput = useInput((value: string) => value.trim() !== '');
  const confirmPasswordInput = useInput(
    (value: string) => value.trim() === passwordInput.value
  );

  function closeModalHandler() {
    dispatch(uiActions.closeSignupForm());
    console.log('close sign up form');
  }

  function formValidationCondition() {
    return (
      emailInput.isValid &&
      fullNameInput.isValid &&
      passwordInput.isValid &&
      confirmPasswordInput.isValid
    );
  }

  const formIsValid = formValidationCondition();

  async function registerHandler() {
    // create a new user
    const email: string = emailInput.value ? emailInput.value : '';
    const password: string = passwordInput.value ? passwordInput.value : '';
    let { data: newUserCreated, error: createdError } =
      await dbClient.auth.signUp({
        email,
        password,
      });

    // get the new user id in order to fill out information in user_info table
    if (newUserCreated) {
      const newUserId: string = newUserCreated.user
        ? newUserCreated.user.id
        : '';
      const fullName: string = fullNameInput.value ? fullNameInput.value : '';
      let { data, error } = await dbClient.from('user_info').insert({
        id: newUserId,
        full_name: fullName,
        email,
      });
    }

    alert('a confirmation email has been sent to your address');

    closeModalHandler();
  }

  return isVisible ? (
    <Modal title='Register with email' onClick={closeModalHandler}>
      <Form className=' min-w-fit w-1/2 mx-auto'>
        <FormInput
          inputLabel='Full Name'
          inputId='user-name'
          inputType='text'
          errorMessage='Name cannot be empty'
          hasError={fullNameInput.hasError}
          onChange={fullNameInput.onChangeHandler}
          onBlur={fullNameInput.onBlurHandler}
        />
        <FormInput
          inputLabel='Email'
          inputId='user-email'
          inputType='email'
          errorMessage='incorrect email format'
          hasError={emailInput.hasError}
          onChange={emailInput.onChangeHandler}
          onBlur={emailInput.onBlurHandler}
        />
        <FormInput
          inputLabel='Password'
          inputId='user-password'
          inputType='password'
          errorMessage='Password cannot be empty'
          hasError={passwordInput.hasError}
          onChange={passwordInput.onChangeHandler}
          onBlur={passwordInput.onBlurHandler}
        />
        <FormInput
          inputLabel='Confirm Password'
          inputId='user-confirm-password'
          inputType='password'
          errorMessage='Passwords must match'
          hasError={confirmPasswordInput.hasError}
          onChange={confirmPasswordInput.onChangeHandler}
          onBlur={confirmPasswordInput.onBlurHandler}
        />
        <FormButtonList>
          <Button outline onClick={closeModalHandler}>
            Cancel
          </Button>
          <Button disabled={!formIsValid} onClick={registerHandler}>
            Register
          </Button>
        </FormButtonList>
      </Form>
    </Modal>
  ) : null;
}

export default SignupForm;
