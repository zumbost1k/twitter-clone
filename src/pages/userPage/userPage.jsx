import React, { useEffect, useState } from 'react';
import './userPage.css';
import ProfileHeader from '@/components/profileHeader/profileHeader';
import ContentFilter from '@/components/contentFilter/contentFilter';
import AllNews from '@/components/allNews/allNews';
import Loader from '@/UI/loader/loader';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

const UserPage = () => {
  const [userPageNews, setUserPageNews] = useState(null);
  const { id = 'currentUser' } = useParams();
  const { userId } = useAuth();

  useEffect(() => {
    fetch(
      `https://twittercloneapiproductionenv.azurewebsites.net/Tweet/GetUserTweetsAndRetweets${
        id === 'currentUser' ? userId : id
      }`,
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
  }, [id, userId]);

  if (!userPageNews) {
    return <Loader />;
  }
  return (
    <section>
      <ProfileHeader />
      <div className='filtered-news'>
        {!userPageNews.length ? (
          <p className='common-text bookmarks-page-section__common-text'>
            No posts have been written yet
          </p>
        ) : (
          <div className='explore-all-news'>
            <AllNews isUserPage={true} allNews={userPageNews} />
          </div>
        )}
      </div>
    </section>
  );
};

export default UserPage;
