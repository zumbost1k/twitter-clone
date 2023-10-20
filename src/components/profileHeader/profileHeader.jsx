import React from 'react';
import './profileHeader.css';
import Subscribe from '@/icons/subscribe';
import CustomButton from '@/UI/customButton/cistomButton';
const ProfileHeader = () => {
  return (
    <section
      className='profile-header'
      style={{
        backgroundImage: "url('./photos/profileBackgrounds/mountain.jpg')",
      }}
    >
      <img
        className='avatar profile-header__avatar'
        src='./photos/usersAvatar/manface.jpg'
        alt='avatar'
        width='116'
        height='116'
      />
      <div className='container profile-header__container'>
        <h2 className='name profile-header__name'>Daniel Jensen</h2>
        <div className='followers container__followers'>
          <p className='common-text followers__common-text'>
            <span className='followers__common-text_bold'>2,569</span> Following
          </p>
          <p className='common-text followers__common-text'>
            <span className='followers__common-text_bold'>10.8K</span> Followers
          </p>
        </div>
        <p className='common-text container__common-text'>
          Photographer & Filmmaker based in Copenhagen, Denmark ✵ &#9770;
        </p>
        <div className='custom-button container__custom-button'>
          <CustomButton
            content={
              <span className='content container__content'>
                <Subscribe />
                Follow
              </span>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
