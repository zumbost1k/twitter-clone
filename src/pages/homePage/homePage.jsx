import React, { useEffect, useState } from 'react';
import './homePage.css';
import AllNews from '@/components/allNews/allNews';
import AddNews from '@/components/addNews/addNews';
import HashtagFilter from '@/components/hashtagFilter/hashtagFilter';
import UsersToFollow from '@/components/usersToFollow/usersToFollow';
import { useAllTweets } from '@/hooks/use-allTweets';

const HomePage = () => {
  const [homePageNews, setHomePageNews] = useState(null);
  const fetchAndSetTweets = useAllTweets();
  useEffect(() => {
    fetchAndSetTweets()
      .then((reversedData) => {
        setHomePageNews(reversedData);
      })
      .catch((error) => {
        console.error('Failed to load tweets:', error);
      });
   }, [fetchAndSetTweets]);

  if (homePageNews) {
    return (
      <section className='home-page'>
        <div>
          <AddNews />
          <AllNews isUserPage={false} allNews={homePageNews} />
        </div>
        <div className='trends'>
          <HashtagFilter />
          <UsersToFollow />
        </div>
      </section>
    );
  }
};

export default HomePage;
