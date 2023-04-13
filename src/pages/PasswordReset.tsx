import React from 'react';
import { Form, useNavigate } from 'react-router-dom';
import FormInput from '../components/UI/FormInput';
import useInput from '../components/UI/hooks/use-input';
import FormButtonList from '../components/UI/FormButtonList';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import dbClient from '../API/dbClient';

function PasswordResetPage() {
  // const { userId } = useParams();
  const navigate = useNavigate();
  const passwordInput = useInput((value: string) => value.trim().length >= 6);
  const confirmPasswordInput = useInput(
    (value: string) => value.trim() === passwordInput.value
  );

  function formValidationCondition() {
    return passwordInput.isValid && confirmPasswordInput.isValid;
  }

  const formIsValid = formValidationCondition();

  async function passwordResetHandler() {
    const newPassword: string = passwordInput.value ? passwordInput.value : '';
    const { data, error } = await dbClient.auth.updateUser({
      password: newPassword,
    });

    if (error && error.message) {
      alert(error?.message);
    } else {
      alert('password changed sucessfully');
      navigate('/');
    }
  }

  return (
    <div className='indent-0 md:text-2xl text-slate-800 dark:text-slate-200 text-center font-serif grid place-items-center'>
      <Card title='Enter a new password'>
        <Form className=' min-w-fit w-1/2 mx-auto'>
          <FormInput
            inputLabel='Password'
            inputId='user-password'
            inputType='password'
            errorMessage='Password needs to be at least 6 characters'
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
            <Button disabled={!formIsValid} onClick={passwordResetHandler}>
              Register
            </Button>
          </FormButtonList>
        </Form>
      </Card>
    </div>
  );
}

export default PasswordResetPage;
