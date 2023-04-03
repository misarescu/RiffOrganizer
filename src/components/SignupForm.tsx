import React from 'react';
import Modal from './UI/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { StoreStateType } from '../store';
import { uiActions } from '../store/ui-slice';

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
      <p>Signup form</p>
    </Modal>
  ) : null;
}

export default SignupForm;
