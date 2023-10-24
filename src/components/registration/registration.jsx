import React, { useState } from 'react';
import './registration.css';
import { useValid } from '@/hooks/use-valid';
import CustomButton from '@/UI/customButton/cistomButton';
import Tweeter from '@/icons/tweeter';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/slices/currentUserSlice';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retryPassword, setRetryPassword] = useState('');
  const checkPasswords = (password1, password2) => {
    return password1 === password2;
  };
  const isPasswordValid = useValid(password, ['lengthcheck']);
  const isEmailValid = useValid(email, ['isempty']);
  const disabledState =
    !checkPasswords(password, retryPassword) && isPasswordValid && isEmailValid;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HandleRegistration = (e) => {
    e.preventDefault();
    dispatch(
      setCurrentUser({
        userEmail: email,
        userToken: '1',
      })
    );
    navigate('/home');
  };
  return (
    <section className='registration-section'>
      <div className='registration-block'>
        <div className='logo registration-block__logo'>
          <Tweeter width={'120'} height={'45'} />{' '}
          <h2 className='title registration-section__title'>Sign in</h2>
        </div>

        <p className='text registration-section__text'>
          If you already have an account register you can Login
          {/* <Link className='rout-link' to='/authorization'>
            here
          </Link> */}
          !
        </p>
        <form
          onSubmit={HandleRegistration}
          className='registration-form registration-section__form'
        >
          <div className='form__registration-input'>
            <label htmlFor='login' className='text'>
              Login
            </label>
            <input
              required
              value={email}
              onInput={(e) => {
                setEmail(e.target.value);
              }}
              id='login'
              className='registration-input'
              placeholder='Enter your login...'
              type='email'
            />
          </div>
          <div className='form__registration-input'>
            <label htmlFor='password' className='text'>
              Password
            </label>
            <input
              required
              value={password}
              onInput={(e) => {
                setPassword(e.target.value);
              }}
              id='password'
              className='registration-input'
              placeholder='Enter your password...'
              type='password'
            />
          </div>
          <div className='form__registration-input'>
            <label htmlFor='confirm-password' className='text'>
              Confrim Password
            </label>
            <input
              required
              value={retryPassword}
              onInput={(e) => {
                setRetryPassword(e.target.value);
              }}
              id='confirm-password'
              className='registration-input'
              placeholder='Enter your password...'
              type='password'
            />
            {!checkPasswords(password, retryPassword) && (
              <label
                htmlFor='confirm-password'
                className='text registration-input__input-caption_red'
              >
                Passwords must match
              </label>
            )}
          </div>
          <CustomButton
            disabledState={disabledState}
            content={<span>Sign in</span>}
            type={'submit'}
            size={'standard'}
          />
        </form>
      </div>
    </section>
  );
};

export default Registration;
