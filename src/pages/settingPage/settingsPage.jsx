import React, { useState } from 'react';
import './settingsPage.css';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/selectors/selectors';
import SettingBlock from '@/UI/settingBlock/settingBlock';
import CustomButton from '@/UI/customButton/cistomButton';

const SettingsPage = () => {
  const currentUsersProfile = useSelector(selectCurrentUser);
  const [userAvatar, setUserAvatar] = useState(null);
  const [currentUserAvatar, setCurrentUserAvatar] = useState(
    `${currentUsersProfile.profileAvatar}`
  );
  const [userBackground, setBackground] = useState(null);
  const [currentUserBackground, setCurrentUserBackground] = useState(
    `${currentUsersProfile.profileBackgroundImagePath}`
  );
  const [userName, setUserName] = useState(currentUsersProfile.userName);
  const [userNickName, setUserNickName] = useState(
    currentUsersProfile.nickName || ''
  );
  const [userProfileDescription, setUserProfileDescription] = useState(
    currentUsersProfile.profileDescription || ''
  );
  const SendNewUserDate = (e) => {
    console.log('hello world');
    const formData = new FormData();
    formData.append('UserName', userNickName);
    formData.append('FullName', userName);
    formData.append('Bio', userProfileDescription);
    formData.append('ProfilePicture', userAvatar);
    formData.append('BackPicture', userBackground);

    fetch(
      'https://twittercloneapiproductionenv.azurewebsites.net/UserProfile/UpdateUserProfile',
      {
        method: 'PUT',
        body: formData,
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    );
  };

  return (
    <section className='settings-page'>
      <div className='container settings-page__container'>
        <h3 className='dark-text dark-text__container'>Personal information</h3>
        <form
          onSubmit={SendNewUserDate}
          className='settings-form container__settings-form'
        >
          <div className='setter-photos settings-form__setter-photos'>
            <div className='setter-photo__user-avatar'>
              <label htmlFor='user-avatar'>
                <img
                  src={currentUserAvatar}
                  alt='avatar'
                  width='72'
                  height='72'
                  className='setter-photos__avatar'
                />
                <input
                  type='file'
                  id='user-avatar'
                  className='none'
                  accept='image/,.png,.jpeg,.jpg'
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      const newAvatardUrl = URL.createObjectURL(
                        e.target.files[0]
                      );
                      setCurrentUserAvatar(newAvatardUrl);
                      setUserAvatar(e.target.files[0]);
                    }
                  }}
                />
              </label>
              <div>
                <p className='text setter-photos__text'>{userName}</p>
                <p className='common-text setter-photos__common-text'>
                  @{userNickName}
                </p>
              </div>
            </div>

            <label
              htmlFor='user-background'
              className='settings-form__user-background'
            >
              <p className='common-text user-background__common-text'>
                Background image
              </p>
              <img
                src={currentUserBackground}
                alt='avatar'
                width='325'
                height='105'
                className='setter-photos__backround'
              />
              <input
                type='file'
                id='user-background'
                className='none'
                accept='image/,.png,.jpeg,.jpg'
                onChange={(e) => {
                  if (e.target.files[0]) {
                    const newBackgroundUrl = URL.createObjectURL(
                      e.target.files[0]
                    );
                    setCurrentUserBackground(newBackgroundUrl);
                    setBackground(e.target.files[0]);
                  }
                }}
              />
            </label>
            <SettingBlock
              inputValue={userName}
              setInputValue={setUserName}
              label={'Name'}
              inputId={'user-name'}
              inputType={'text'}
              size={'standard-input'}
              required={false}
            />
            <SettingBlock
              inputValue={userNickName}
              setInputValue={setUserNickName}
              label={'Nickname'}
              inputId={'user-nickname'}
              inputType={'text'}
              size={'standard-input'}
              required={false}
            />
            <SettingBlock
              inputValue={userProfileDescription}
              setInputValue={setUserProfileDescription}
              label={'Profile description'}
              inputId={'user-description'}
              inputType={'text'}
              size={'textholder-input'}
              required={false}
            />
          </div>
          <div className='settings-form__button'>
            <CustomButton type={'submit'} size={'standard'} content={'Save'} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default SettingsPage;
