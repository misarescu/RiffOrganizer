import React from 'react';
import Modal from './UI/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { StoreStateType } from '../store';
import { useNavigate } from 'react-router-dom';
import Button from './UI/Button';
import { uiActions } from '../store/ui-slice';
import { userActions } from '../store/user-slice';
import { Form } from 'react-router-dom';
import FormInput from './UI/FormInput';
import FormButtonList from './UI/FormButtonList';

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
      <Form className=' min-w-fit w-1/2 mx-auto'>
        <FormInput inputLabel='Email' inputId='user-email' inputType='email' />
        <FormInput
          inputLabel='Password'
          inputId='user-password'
          inputType='password'
        />
        <FormButtonList>
          <Button outline>Forgot password</Button>
          <Button onClick={loginHandler}>Log In</Button>
        </FormButtonList>
      </Form>
    </Modal>
  ) : null;
}

export default LoginForm;
