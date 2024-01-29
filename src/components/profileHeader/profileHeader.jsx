import React, { useEffect, useState } from 'react';
import './profileHeader.css';
import Subscribe from '@/icons/subscribe';
import CustomButton from '@/UI/customButton/cistomButton';
import { useParams } from 'react-router-dom';
import { format } from 'numerable';
import { useSubscribe } from '@/hooks/use-subscribe';
import { useGetUserById } from '@/hooks/use-getUserById';
import Loader from '@/UI/loader/loader';

const ProfileHeader = () => {
  const { id = 'currentUser' } = useParams();
  const [shouldFetch, setShouldFetch] = useState(true);
  const isCurrentUserPage = id === 'currentUser';
  const { isSubscribe, subscribe, unsubscribe } = useSubscribe(
    isCurrentUserPage ? 1 : id
  );
  const [currentUser, setCurrentUser] = useState(null);

  const user = useGetUserById(id);

  useEffect(() => {
    setShouldFetch(true);
  }, [id]);

  useEffect(() => {
    if (shouldFetch) {
      const fetchUser = async () => {
        setCurrentUser(await user);
      };
      fetchUser().then(() => {
        setShouldFetch(false);
      });
    }
  }, [id, user, shouldFetch]);

  if (!currentUser) {
    return <Loader />;
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
                onClickfunction={isSubscribe ? unsubscribe : subscribe}
                activeClass={isSubscribe ? 'button__subscribee-grey' : 'blue'}
                content={
                  <div>
                    {isSubscribe ? (
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
