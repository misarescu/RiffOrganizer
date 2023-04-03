import React from 'react';
import Modal from './UI/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { StoreStateType } from '../store';
import { uiActions } from '../store/ui-slice';
import { Form } from 'react-router-dom';
import FormInput from './UI/FormInput';
import FormButtonList from './UI/FormButtonList';
import Button from './UI/Button';

function SignupForm() {
  const dispatch = useDispatch();
  const isVisible = useSelector(
    (state: StoreStateType) => state.ui.isSignupFormVisible
  );

  function closeModalHandler() {
    dispatch(uiActions.closeSignupForm());
    console.log('close sign up form');
  }

  return isVisible ? (
    <Modal title='Register with email' onClick={closeModalHandler}>
      <Form className=' min-w-fit w-1/2 mx-auto'>
        <FormInput
          inputLabel='Full Name'
          inputId='user-name'
          inputType='text'
        />
        <FormInput inputLabel='Email' inputId='user-email' inputType='email' />
        <FormInput
          inputLabel='Password'
          inputId='user-password'
          inputType='password'
        />
        <FormButtonList>
          <Button outline>Cancel</Button>
          <Button>Log In</Button>
        </FormButtonList>
      </Form>
    </Modal>
  ) : null;
}

export default SignupForm;
