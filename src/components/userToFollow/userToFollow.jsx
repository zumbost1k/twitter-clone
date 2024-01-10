import React from 'react';
import './userToFollow.css';
import CustomButton from '@/UI/customButton/cistomButton';
import { format } from 'numerable';
import { Link } from 'react-router-dom';
import { useSubscribe } from '@/hooks/use-subscribe';
import Subscribe from '@/icons/subscribe';
const UserToFollow = ({ currentTopUserByFollowers }) => {
  const { isSubscribe, subscribe, unsubscribe } = useSubscribe(
    currentTopUserByFollowers.userId
  );
  return (
    <div
      key={currentTopUserByFollowers.userId}
      className='top-user top-users__top-user'
    >
      <div className='top-user__avatar'>
        <img
          src={
            currentTopUserByFollowers.profilePicture
              ? currentTopUserByFollowers.profilePicture
              : './photos/usersAvatar/emptyAvatar.jpg'
          }
          alt='avatar'
          width='40'
          height='40'
          className='avatar'
        />
      </div>

      <div className='name-followers-block top-user__name-followers-block'>
        <Link to={`/user/${38}`} className='name name-followers-block__name'>
          {currentTopUserByFollowers.fullName
            ? currentTopUserByFollowers.fullName
            : currentTopUserByFollowers.userName}
        </Link>
        <p className='common-text name-followers-block__common-text'>
          {format(currentTopUserByFollowers.quantityOfFollowers, '0a')}
        </p>
      </div>
      <div className='top-user__button'>
        <CustomButton
          type={'button'}
          size={'small'}
          onClickfunction={isSubscribe ? unsubscribe : subscribe}
          activeClass={isSubscribe ? 'button__subscribee-grey' : 'blue'}
          content={
            <div>
              {isSubscribe ? (
                <span className='content container__content'>Unsubscribe</span>
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

      <p className='common-text top-user__common-text'>
        {currentTopUserByFollowers.profileDescription}
      </p>
      <img
        src={
          currentTopUserByFollowers.backPicture
            ? currentTopUserByFollowers.backPicture
            : './photos/profileBackgrounds/mountain.jpg'
        }
        alt='background'
        className='background top-user__background'
        width='263'
        height='75'
      />
    </div>
  );
};
export default UserToFollow;
