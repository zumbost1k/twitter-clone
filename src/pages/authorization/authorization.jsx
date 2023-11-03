import React, { useState } from 'react';
import './authorization.css';
import { useValid } from '@/hooks/use-valid';
import CustomButton from '@/UI/customButton/cistomButton';
import Tweeter from '@/icons/tweeter';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/slices/currentUserSlice';
import { Link, useNavigate } from 'react-router-dom';

const Authorization = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isPasswordValid = useValid(password, ['lengthCheck']);
  const isEmailValid = useValid(email, ['isEmpty']);
  const disabledState = isPasswordValid && isEmailValid;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HandleAuthorization = (e) => {
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
          If you don’t have an account register you can Register{' '}
          <Link className='rout-link' to='/registration'>
            here
          </Link>
          !
        </p>
        <form
          onSubmit={HandleAuthorization}
          className='registration-form registration-section__form'
        >
          <div className='form__registration-input'>
            <label htmlFor='login' className='text'>
              Email
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

          <CustomButton
            disabledState={!disabledState}
            content={<span>Sign in</span>}
            type={'submit'}
            size={'standard'}
          />
        </form>
      </div>
    </section>
  );
};

export default Authorization;
