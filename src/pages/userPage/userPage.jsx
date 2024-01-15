import React, { useEffect, useState } from 'react';
import './userPage.css';
import ProfileHeader from '@/components/profileHeader/profileHeader';
import ContentFilter from '@/components/contentFilter/contentFilter';
import AllNews from '@/components/allNews/allNews';
import Loader from '@/UI/loader/loader';

const UserPage = () => {
  const [userPageNews, setUserPageNews] = useState(null);
  useEffect(() => {
    fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Tweet/GetCurrentUserTweetsAndRetweets`,
      {
        method: 'GET',
        credentials: 'include',
        withCredentials: true,
        crossorigin: true,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setUserPageNews(data.data);
      });
  }, []);

  if (!userPageNews) {
    return <Loader />;
  }
  return (
    <section>
      <ProfileHeader />
      <div className='filtered-news'>
        <ContentFilter
          filterLinks={[
            {
              labelText: 'Tweets',
              id: 'tweets',
            },
            {
              labelText: 'Tweets & replies',
              id: 'replies',
            },
            {
              labelText: 'Media',
              id: 'media',
            },
            {
              labelText: 'Likes',
              id: 'likes',
            },
          ]}
        />
        <AllNews isUserPage={true} allNews={userPageNews} />
      </div>
    </section>
  );
};

export default UserPage;
