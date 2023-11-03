import React, { useState } from 'react';
import './settingsPage.css';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/selectors/selectors';

const SettingsPage = () => {
  const currentUsersProfile = useSelector(selectCurrentUser);
  const [userAvatar, setUserAvatar] = useState(
    currentUsersProfile.profileAvatar
  );
  const [userBackground, setBackground] = useState(
    currentUsersProfile.profileBackgroundImagePath
  );
  return (
    <section className='settings-page'>
      <div className='container settings-page__container'>
        <h3 className='dark-text dark-text__container'>Personal information</h3>
        <form className='settings-form container__settings-form'>
          <div>
            <label htmlFor='user-avatar'>
              <img
                src={`./photos/usersAvatar/${currentUsersProfile.profileAvatar}`}
                alt='avatar'
                width='72'
                height='72'
              />
            </label>
            <input
              type='file'
              id='user-avatar'
              className='none'
              accept='image/,.png,.jpeg,.jpg'
              onChange={(e) => {
                setUserAvatar();
              }}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default SettingsPage;
