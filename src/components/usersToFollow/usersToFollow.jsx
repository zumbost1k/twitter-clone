import React from 'react';
import './usersToFollow.css';
import { useDispatch, useSelector } from 'react-redux';
import Subscribe from '@/icons/subscribe';
import { selectTopTwoUsersByFollowers } from '@/selectors/selectors';
import CustomButton from '@/UI/customButton/cistomButton';
import { format } from 'numerable';
import { changeCurrentUserPage } from '@/slices/allUsersSlice';
import { Link } from 'react-router-dom';

const UsersToFollow = () => {
  const dispatch = useDispatch();
  const topUsersByFollowers = useSelector(selectTopTwoUsersByFollowers);
  const setCurrentUserHandle = (userId) => {
    dispatch(changeCurrentUserPage(userId));
  };
  return (
    <section className='users-to-follow-section'>
      <div className='container users-to-follow-section__container'>
        <h4 className='dark-text container__dark-text'>Who to follow</h4>
        <div className='top-users top-users__container'>
          {topUsersByFollowers.map((currentTopUserByFollowers) => {
            return (
              <div className='top-user top-users__top-user'>
                <div className='top-user__avatar'>
                  <img
                    src={`./photos/usersAvatar/${currentTopUserByFollowers.profileAvatar}`}
                    alt='avatar'
                    width='40'
                    height='40'
                    className='avatar'
                  />
                </div>

                <div className='name-followers-block top-user__name-followers-block'>
                  <Link
                    onClick={() => {
                      setCurrentUserHandle(currentTopUserByFollowers.userId);
                    }}
                    to={`/user/${currentTopUserByFollowers.userId}`}
                    className='name name-followers-block__name'
                  >
                    {currentTopUserByFollowers.userName}
                  </Link>
                  <p className='common-text name-followers-block__common-text'>
                    {format(
                      currentTopUserByFollowers.quantityOfFollowers,
                      '0a'
                    )}
                  </p>
                </div>
                <div className='top-user__button'>
                  <CustomButton
                    type={'button'}
                    size={'small'}
                    content={
                      <span className='content container__content'>
                        <Subscribe width={'14'} height={'14'} />
                        Follow
                      </span>
                    }
                  />
                </div>

                <p className='common-text top-user__common-text'>
                  {currentTopUserByFollowers.profileDescription}
                </p>
                <img
                  src={`./photos/profileBackgrounds/${currentTopUserByFollowers.profileBackgroundImagePath}`}
                  alt='background'
                  className='background top-user__background'
                  width='263'
                  height='75'
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UsersToFollow;
