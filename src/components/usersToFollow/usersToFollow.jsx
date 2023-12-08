import React from 'react';
import './usersToFollow.css';
import { useSelector } from 'react-redux';
import { selectTopTwoUsersByFollowers } from '@/selectors/selectors';
import UserToFollow from '../userToFollow/userToFollow';

const UsersToFollow = () => {
  const topUsersByFollowers = useSelector(selectTopTwoUsersByFollowers);
  return (
    <section className='users-to-follow-section'>
      <div className='container users-to-follow-section__container'>
        <h4 className='dark-text container__dark-text'>Who to follow</h4>
        <div className='top-users top-users__container'>
          {topUsersByFollowers.map((currentTopUserByFollowers) => {
            return (
              <UserToFollow
                key={currentTopUserByFollowers.userId}
                currentTopUserByFollowers={currentTopUserByFollowers}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UsersToFollow;
