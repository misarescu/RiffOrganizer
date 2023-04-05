import React, { useRef } from 'react';
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
import dbClient from '../API/dbClient';
import { useGetUserDetails } from '../API/hooks/api-calls';

function LoginForm() {
  // const userDetails = useGetUserDetails();
  const userEmail = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isVisible = useSelector(
    (state: StoreStateType) => state.ui.isLoginFormVisible
  );

  async function signInWithEmail() {
    const { data, error } = await dbClient.auth.signInWithPassword({
      email: userEmail.current?.value as string,
      password: userPassword.current?.value as string,
    });
    if (error && error.status === 400) {
      // bad request due to wrong credentials
      alert(error.message);
      return;
    }

    if (data.user && data.user.role !== 'authenticated') {
      alert('user is not authenticated correctly');
      return;
    }
    dispatch(uiActions.closeLoginForm());
    dispatch(userActions.login());
    navigate(`/user/${data.user?.id}`);
  }

  function closeModalHandler() {
    dispatch(uiActions.closeLoginForm());
  }

  function loginHandler() {
    signInWithEmail();
  }

  return isVisible ? (
    <Modal title='Enter your login credentials' onClick={closeModalHandler}>
      <Form className=' min-w-fit w-1/2 mx-auto'>
        <FormInput
          inputLabel='Email'
          inputId='user-email'
          inputType='email'
          ref={userEmail}
        />
        <FormInput
          inputLabel='Password'
          inputId='user-password'
          inputType='password'
          ref={userPassword}
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