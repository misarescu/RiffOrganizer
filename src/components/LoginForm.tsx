import React, { useRef, useState } from 'react';
import Modal from './UI/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { StoreStateType } from '../store';
import { useResolvedPath, useNavigate } from 'react-router-dom';
import Button from './UI/Button';
import { uiActions } from '../store/ui-slice';
import { userActions } from '../store/user-slice';
import { Form } from 'react-router-dom';
import FormInput from './UI/FormInput';
import FormButtonList from './UI/FormButtonList';
import dbClient from '../API/dbClient';
import useInput from './hooks/use-input';

function LoginForm() {
  const currentPath = window.location.href;
  const [isPasswordForgotten, setIsPasswordForgotten] = useState(false);
  const userEmail = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isVisible = useSelector(
    (state: StoreStateType) => state.ui.isLoginFormVisible
  );

  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const emailInput = useInput((value: string) => mailFormat.test(value.trim()));
  const passwordInput = useInput((value: string) => value.trim() !== '');

  function formValidationCondition() {
    if (isPasswordForgotten) return emailInput.isValid;

    return emailInput.isValid && passwordInput.isValid;
  }

  const formIsValid = formValidationCondition();

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

  async function resetPassword() {
    const { data: userData, error: userError } = await dbClient
      .from('user_info')
      .select('id')
      .eq('email', userEmail.current?.value as string);

    if (userData?.at(0)?.id) {
      const { data, error } = await dbClient.auth.resetPasswordForEmail(
        userEmail.current?.value as string,
        {
          redirectTo: `${currentPath}password-reset/${userData?.at(0)?.id}`,
        }
      );
      // console.log(
      //   'redirect to %s',
      //   `${currentPath}password-reset/${userData?.at(0)?.id}`
      // );
    } else {
      alert('no user with this email address');
    }
  }

  function closeModalHandler() {
    dispatch(uiActions.closeLoginForm());
  }

  function loginHandler() {
    if (isPasswordForgotten) resetPassword();
    else signInWithEmail();
  }

  return isVisible ? (
    <Modal title='Enter your login credentials' onClick={closeModalHandler}>
      <Form className=' min-w-fit w-1/2 mx-auto'>
        <FormInput
          inputLabel='Email'
          inputId='user-email'
          inputType='email'
          errorMessage='incorrect email format'
          hasError={emailInput.hasError}
          onChange={emailInput.onChangeHandler}
          onBlur={emailInput.onBlurHandler}
          ref={userEmail}
        />
        {!isPasswordForgotten ? (
          <FormInput
            inputLabel='Password'
            inputId='user-password'
            inputType='password'
            errorMessage='incorrect password'
            hasError={passwordInput.hasError}
            onChange={passwordInput.onChangeHandler}
            onBlur={passwordInput.onBlurHandler}
            ref={userPassword}
          />
        ) : null}

        <FormButtonList>
          <Button
            outline
            onClick={() => {
              setIsPasswordForgotten((state) => !state);
            }}>
            {!isPasswordForgotten ? 'Forgot password' : 'Back'}
          </Button>
          <Button onClick={loginHandler} disabled={!formIsValid}>
            {!isPasswordForgotten ? 'Log In' : 'Reset Password'}
          </Button>
        </FormButtonList>
      </Form>
    </Modal>
  ) : null;
}

export default LoginForm;
