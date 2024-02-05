import React, { useEffect, useState } from 'react';
import './profileHeader.css';
import Subscribe from '@/icons/subscribe';
import CustomButton from '@/UI/customButton/cistomButton';
import { useParams } from 'react-router-dom';
import { format } from 'numerable';
import { useSubscribe } from '@/hooks/use-subscribe';

const ProfileHeader = ({ currentUser }) => {
  const { id = 'currentUser' } = useParams();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const isCurrentUserPage = id === 'currentUser';
  const { subscribe, unsubscribe } = useSubscribe(
    isCurrentUserPage ? 1 : id,
    isSubscribed
  );

  useEffect(() => {
    if (currentUser) {
      setIsSubscribed(currentUser.isSubscribed);
    }
  }, [currentUser]);

  if (!currentUser) {
    return;
  }

  return (
    <section
      className='profile-header-container'
      style={{
        backgroundImage: `url('${currentUser.profileBackgroundImagePath}')`,
      }}
    >
      <div className='profile-header'>
        <img
          className='avatar profile-header__avatar'
          src={`${currentUser.profileAvatar}`}
          alt='avatar'
          width='116'
          height='116'
        />
        <div className='container profile-header__container'>
          <div className='user-names profile-header__user-names'>
            <h2 className='name profile-header__name'>
              {currentUser.fullName
                ? currentUser.fullName
                : currentUser.nickName}
            </h2>{' '}
            <span className='common-text'>@{currentUser.nickName}</span>
          </div>

          <div className='followers container__followers'>
            <p className='common-text followers__common-text'>
              <span className='followers__common-text_bold'>
                {format(currentUser.quantityOfFollowing, '0a')}
              </span>{' '}
              Following
            </p>
            <p className='common-text followers__common-text'>
              <span className='followers__common-text_bold'>
                {format(currentUser.quantityOfFollowers, '0a')}
              </span>{' '}
              Followers
            </p>
          </div>
          <p className='common-text container__common-text'>
            {currentUser.profileDescription}
          </p>
          {!isCurrentUserPage ? (
            <div className='custom-button container__custom-button'>
              <CustomButton
                type={'button'}
                size={'standard'}
                onClickfunction={() => {
                  if (isSubscribed) {
                    setIsSubscribed(false);
                    unsubscribe();
                  } else {
                    setIsSubscribed(true);
                    subscribe();
                  }
                }}
                activeClass={isSubscribed ? 'button__subscribee-grey' : 'blue'}
                content={
                  <div>
                    {isSubscribed ? (
                      <span className='content container__content'>
                        Unsubscribe
                      </span>
                    ) : (
                      <div className='content container__content'>
                        <Subscribe width={'14'} height={'14'} />
                        <span>Follow</span>
                      </div>
                    )}
                  </div>
                }
              />
            </div>
          ) : (
            <div className='custom-button container__custom-button' />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
