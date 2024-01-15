import React, { useEffect, useState } from 'react';
import './usersToFollow.css';
import UserToFollow from '../userToFollow/userToFollow';
import Loader from '@/UI/loader/loader';

const UsersToFollow = () => {
  const [topUsersByFollowers, setTopUsersByFollowers] = useState(null);

  useEffect(() => {
    fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/UserProfile/GetTwoPopularProfiles`,
      {
        method: 'GET',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    )
      .then((json) => {
        return json.json();
      })
      .then((data) => {
        setTopUsersByFollowers(data.data);
      });
  }, []);
  if (!topUsersByFollowers) {
    return <Loader />;
  }
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
