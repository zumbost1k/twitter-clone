import React, { useState } from 'react';
import './registration.css';
import { useValid } from '@/hooks/use-valid';
import CustomButton from '@/UI/customButton/cistomButton';
import Tweeter from '@/icons/tweeter';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retryPassword, setRetryPassword] = useState('');
  const [hasInteractedEmail, setHasInteractedEmail] = useState(false);
  const [hasInteractedPassword, setHasInteractedPassword] = useState(false);

  const checkPasswords = (password1, password2) => {
    return password1 === password2;
  };
  const isPasswordValid = useValid(password, ['lengthCheck']);
  const isEmailValid = useValid(email, ['isEmpty', 'isEmail']);
  const disabledState =
    checkPasswords(password, retryPassword) && isPasswordValid && isEmailValid;
  const navigate = useNavigate();
  const HandleRegistration = (e) => {
    e.preventDefault();
    fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Authentication/Registration`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        navigate('/authorization');
      })
      .catch((error) => {
        console.error(
          'There has been a problem with your fetch operation:',
          error
        );
      });
  };

  return (
    <section className='registration-section'>
      <div className='registration-block'>
        <div className='logo registration-block__logo'>
          <Tweeter width={'120'} height={'45'} />{' '}
          <h2 className='title registration-section__title'>Sign up</h2>
        </div>

        <p className='text registration-section__text'>
          If you already have an account register you can Login{' '}
          <Link className='rout-link' to='/authorization'>
            here
          </Link>
          !
        </p>

        <form
          onSubmit={HandleRegistration}
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
                setHasInteractedEmail(true);
              }}
              id='login'
              className='registration-input'
              placeholder='example@gmail.com'
              type='email'
            />
            {hasInteractedEmail &&
              (isEmailValid ? (
                ''
              ) : (
                <label
                  htmlFor='login'
                  className='text registration-input__input-caption_red'
                >
                  Please insert a valid email address
                </label>
              ))}
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
                setHasInteractedPassword(true);
              }}
              id='password'
              className='registration-input'
              placeholder='Enter your password...'
              type='password'
            />
            {hasInteractedPassword &&
              (!isPasswordValid ? (
                <p className='text registration-input__input-caption_red'>
                  Password must be longer than 7 characters.
                </p>
              ) : (
                ''
              ))}
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
            disabledState={!disabledState}
            content={<span>Sign up</span>}
            type={'submit'}
            size={'standard'}
          />
        </form>
      </div>
    </section>
  );
};

export default Registration;
