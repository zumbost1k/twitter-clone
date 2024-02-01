import React, { useEffect, useState } from 'react';
import './homePage.css';
import AllNews from '@/components/allNews/allNews';
import AddNews from '@/components/addNews/addNews';
import HashtagFilter from '@/components/hashtagFilter/hashtagFilter';
import UsersToFollow from '@/components/usersToFollow/usersToFollow';
import { useAllTweets } from '@/hooks/use-allTweets';
import Loader from '@/UI/loader/loader';
import { useTopHashtags } from '@/hooks/use-topHashtags';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();
  const hashtag = new URLSearchParams(location.search).get('hashtag');
  const [homePageNews, setHomePageNews] = useState(null);
  const [isShouldFetch, setIsShouldFetch] = useState(true);
  const [isShouldFetchHashtags, setIsShouldFetchHashtags] = useState(true);
  const [hashtags, setHashtags] = useState(null);
  const fetchAndSetTweets = useAllTweets();
  const fetchHashtags = useTopHashtags();
  const addHomePageNewsHandler = (post) => {
    const newHomePageNews = [post, ...homePageNews];
    setHomePageNews(newHomePageNews);
  };

  useEffect(() => {
    setIsShouldFetch(true);
  }, [hashtag]);

  useEffect(() => {
    if (isShouldFetch) {
      fetchAndSetTweets(hashtag)
        .then((reversedData) => {
          setIsShouldFetch(false);
          setHomePageNews(reversedData);
        })
        .catch((error) => {
          console.error('Failed to load tweets:', error);
        });
    }
  }, [fetchAndSetTweets, isShouldFetch, hashtag]);

  useEffect(() => {
    if (isShouldFetchHashtags) {
      fetchHashtags().then((data) => {
        setHashtags(data);
        setIsShouldFetchHashtags(false);
      });
    }
  }, [fetchHashtags, isShouldFetchHashtags]);

  if (!homePageNews || !hashtags) {
    return <Loader />;
  }
  return (
    <section className='home-page'>
      <div>
        <AddNews addHomePageNewsHandler={addHomePageNewsHandler} />
        {!homePageNews.length ? (
          <p className='common-text bookmarks-page-section__common-text'>
            No posts have been written yet
          </p>
        ) : (
          <AllNews isUserPage={false} allNews={homePageNews} />
        )}
      </div>
      <div className='trends'>
        <HashtagFilter hashtags={hashtags} />
        <UsersToFollow />
      </div>
    </section>
  );
};

export default HomePage;
