import React from 'react';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../store/user-slice';
import { uiActions } from '../../store/ui-slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { StoreStateType } from '../../store/index';
import logoImgUrl from '../../assets/Logo.png';
import defaultUserImgUrl from '../../assets/DefaultUserIcon.svg';
import Button from './Button';
import Search from './Search';

// maybe a burger button could be better than the user profile
// import burgerMenuImgUrl from '../../assets/BurgerMenu.svg';

const USER_NAME = 'Mihai Smecheru';

function NavBar() {
  // get user authenticated status
  const userIsAuthenticated = useSelector(
    (state: StoreStateType) => state.user.isAuthenticated
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  function logInHandler() {
    dispatch(uiActions.openLoginForm());
  }

  function signUpHandler() {
    dispatch(uiActions.openSignupForm());
  }

  function logOutHandler() {
    dispatch(userActions.logout());
    navigate('/');
  }

  return (
    <nav className='w-full h-auto bg-blue-500 flex flex-row p-2 space-x-2 justify-between items-center'>
      <div className='h-auto w-auto flex flex-row items-center space-x-2 shrink-0'>
        {!userIsAuthenticated ? (
          <img src={logoImgUrl} className='h-12 w-12' />
        ) : (
          // placeholder image for now
          // TODO:should be fetched from the db

          <img
            src={defaultUserImgUrl}
            className='h-12 w-12 bg-slate-200 rounded-full p-1'
          />
        )}

        <h1 className='hidden md:inline-flex text-2xl text-bold font-semibold font-serif text-slate-800'>
          {/* placeholder name for now 
          TODO: should be fetched from the db */}
          {userIsAuthenticated ? USER_NAME : 'Riff Organizer'}
        </h1>
      </div>
      {userIsAuthenticated ? <Search /> : null}
      {!userIsAuthenticated ? (
        <div className='w-auto h-max flex justify-center items-center flex-row space-y-0 space-x-2 grow-0 shrink-0'>
          <Button special onClick={signUpHandler}>
            Register
          </Button>
          <Button special onClick={logInHandler}>
            Log In
          </Button>
        </div>
      ) : (
        <Button special className='grow-0 shrink-0' onClick={logOutHandler}>
          Log Out
        </Button>
      )}
    </nav>
  );
}

export default NavBar;
