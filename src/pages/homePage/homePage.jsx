import React, { useEffect, useState } from 'react';
import './homePage.css';
import AllNews from '@/components/allNews/allNews';
import AddNews from '@/components/addNews/addNews';
import HashtagFilter from '@/components/hashtagFilter/hashtagFilter';
import UsersToFollow from '@/components/usersToFollow/usersToFollow';
import { useAllTweets } from '@/hooks/use-allTweets';
import Loader from '@/UI/loader/loader';
import { useTopHashtags } from '@/hooks/use-topHashtags';

const HomePage = () => {
  const [homePageNews, setHomePageNews] = useState(null);
  const [isShouldFetch, setIsShouldFetch] = useState(true);
  const [hashtags, setHashtags] = useState(null);
  const fetchAndSetTweets = useAllTweets();
  const fetchHashtags = useTopHashtags();
  useEffect(() => {
    if (isShouldFetch) {
      fetchAndSetTweets()
        .then((reversedData) => {
          setIsShouldFetch(false);
          setHomePageNews(reversedData);
        })
        .catch((error) => {
          console.error('Failed to load tweets:', error);
        });
      fetchHashtags().then((data) => {
        setHashtags(data);
      });
    }
  }, [fetchAndSetTweets, isShouldFetch, fetchHashtags]);

  if (!homePageNews && !hashtags) {
    return <Loader />;
  }
  return (
    <section className='home-page'>
      <div>
        <AddNews />
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
