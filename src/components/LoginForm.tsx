import React from 'react';
import Modal from './UI/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { StoreStateType } from '../store';
import { useNavigate } from 'react-router-dom';
import Button from './UI/Button';
import { uiActions } from '../store/ui-slice';
import { userActions } from '../store/user-slice';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isVisible = useSelector(
    (state: StoreStateType) => state.ui.isLoginFormVisible
  );

  function closeModalHandler() {
    dispatch(uiActions.closeLoginForm());
  }

  function loginHandler() {
    dispatch(uiActions.closeLoginForm());
    dispatch(userActions.login());

    navigate('/user');
  }

  return isVisible ? (
    <Modal title='Enter your login credentials' onClick={closeModalHandler}>
      <p>Login form</p>
      <Button onClick={loginHandler}>Log In</Button>
    </Modal>
  ) : null;
}

export default LoginForm;
